import { useMemo } from 'react'

function mulberry32(a) {
  return function() {
    let t = (a += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function seededRandIn(rng, min, max) {
  return min + (max - min) * rng()
}

function noodlePath(rng, w, h, curvature) {
  const margin = 40
  const x1 = seededRandIn(rng, margin, w - margin)
  const y1 = seededRandIn(rng, margin, h - margin)
  const x2 = seededRandIn(rng, margin, w - margin)
  const y2 = seededRandIn(rng, margin, h - margin)

  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.hypot(dx, dy) || 1
  const nx = -dy / len
  const ny = dx / len
  const curl = curvature * seededRandIn(rng, 0.2, 1.2) * seededRandIn(rng, 0.8, 1.3)
  const offset = curl * seededRandIn(rng, 20, 160)

  const c1x = x1 + dx * 0.33 + nx * offset
  const c1y = y1 + dy * 0.33 + ny * offset
  const c2x = x1 + dx * 0.66 - nx * offset
  const c2y = y1 + dy * 0.66 - ny * offset

  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} C ${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${x2.toFixed(2)} ${y2.toFixed(2)}`
}

function saucePath(rng, w, h) {
  const margin = 80
  const x1 = seededRandIn(rng, margin, w - margin)
  const y1 = seededRandIn(rng, margin, h - margin)
  const x2 = seededRandIn(rng, margin, w - margin)
  const y2 = seededRandIn(rng, margin, h - margin)

  const c1x = x1 + seededRandIn(rng, -120, 120)
  const c1y = y1 + seededRandIn(rng, -120, 120)
  const c2x = x2 + seededRandIn(rng, -120, 120)
  const c2y = y2 + seededRandIn(rng, -120, 120)

  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} C ${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${x2.toFixed(2)} ${y2.toFixed(2)}`
}

function parmesanFlakes(rng, count, w, h) {
  const flakes = []
  for (let i = 0; i < count; i++) {
    const x = seededRandIn(rng, 80, w - 80)
    const y = seededRandIn(rng, 60, h - 60)
    const size = seededRandIn(rng, 2, 5)
    const rot = seededRandIn(rng, 0, 360)
    flakes.push({ x, y, size, rot })
  }
  return flakes
}

function RabbitClipShapes({}) {
  return (
    <g>
      {/* Body */}
      <ellipse cx="440" cy="380" rx="230" ry="180" />
      {/* Head */}
      <circle cx="610" cy="260" r="95" />
      {/* Tail */}
      <circle cx="275" cy="380" r="45" />
      {/* Ear left */}
      <path d="M580 95 C 560 50, 520 45, 505 115 C 490 180, 550 185, 565 145 C 575 125, 585 115, 580 95 Z" />
      {/* Ear right */}
      <path d="M640 90 C 660 35, 705 30, 720 110 C 735 190, 665 185, 650 140 C 642 118, 632 108, 640 90 Z" />
    </g>
  )
}

export default function SpaghettiRabbit({
  width = 1600,
  height = 1200,
  seed = 1,
  density = 300,
  curvature = 0.6,
  strokeWidth = 2,
  noodleColor = '#f2d6a2',
  bgColor = '#0b0b10',
  sauceEnabled = true,
  sauceIntensity = 0.25,
  parmesanEnabled = true,
}) {
  const { noodles, sauces, flakes } = useMemo(() => {
    const rng = mulberry32(seed >>> 0)
    const noodles = Array.from({ length: Math.max(20, Math.floor(density)) }, () => null)
    const saucesCount = sauceEnabled ? Math.floor(density * sauceIntensity * 0.12) : 0
    const sauces = Array.from({ length: saucesCount }, () => null)
    const flakesCount = parmesanEnabled ? Math.floor(density * 0.2) : 0
    const flakes = parmesanFlakes(rng, flakesCount, width, height)

    return { rng, noodles, sauces, flakes }
  }, [seed, density, sauceEnabled, sauceIntensity, parmesanEnabled, width, height])

  // We regenerate paths on render with a seeded RNG for consistency
  const rngForPaths = mulberry32(seed >>> 0)

  const sauceColorA = '#d6402b'
  const sauceColorB = '#ff7a3d'

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ display: 'block', background: bgColor }}
    >
      <defs>
        <clipPath id="rabbitClip" clipPathUnits="userSpaceOnUse">
          <RabbitClipShapes />
        </clipPath>
        <linearGradient id="noodleShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
        </linearGradient>
        <radialGradient id="shine" cx="65%" cy="30%" r="0.6">
          <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      <g clipPath="url(#rabbitClip)">
        <rect x="0" y="0" width={width} height={height} fill="transparent" />

        {/* Base noodles */}
        <g>
          {Array.from({ length: Math.max(20, Math.floor(density)) }).map((_, i) => {
            const path = noodlePath(rngForPaths, width, height, curvature)
            const hueShift = (i % 5) * 0.005
            const stroke = noodleColor
            const sw = strokeWidth * (1 + hueShift)
            return (
              <path
                key={`n-${i}`}
                d={path}
                fill="none"
                stroke={stroke}
                strokeWidth={sw}
                strokeLinecap="round"
                opacity={0.95}
              />
            )
          })}
        </g>

        {/* Sauce accents */}
        {sauceEnabled && (
          <g>
            {Array.from({ length: Math.floor(density * sauceIntensity * 0.12) }).map((_, i) => {
              const path = saucePath(rngForPaths, width, height)
              const col = i % 2 === 0 ? sauceColorA : sauceColorB
              const alpha = 0.18 + (i % 3) * 0.06
              const sw = strokeWidth * 3.2 * (0.8 + (i % 5) * 0.07)
              return (
                <path
                  key={`s-${i}`}
                  d={path}
                  fill="none"
                  stroke={col}
                  strokeWidth={sw}
                  strokeLinecap="round"
                  opacity={alpha}
                />
              )
            })}
          </g>
        )}

        {/* Light sheen overlay to add realism */}
        <rect x="0" y="0" width={width} height={height} fill="url(#shine)" />

        {/* Parmesan flakes */}
        {parmesanEnabled && (
          <g>
            {flakes.map((f, i) => (
              <g key={`p-${i}`} transform={`translate(${f.x.toFixed(2)} ${f.y.toFixed(2)}) rotate(${f.rot.toFixed(2)})`}>
                <rect x={-f.size / 2} y={-f.size / 2} width={f.size} height={f.size * 0.7} fill="#fff9e6" opacity="0.8" rx={0.5} />
                <rect x={(f.size * -0.3)} y={(f.size * -0.15)} width={f.size * 0.5} height={f.size * 0.3} fill="#e7ddb9" opacity="0.5" rx={0.3} />
              </g>
            ))}
          </g>
        )}
      </g>

      {/* Outside shadow for depth */}
      <g opacity="0.6">
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="18" stdDeviation="28" floodColor="#000" floodOpacity="0.6" />
        </filter>
        <g filter="url(#shadow)">
          <g>
            <path d="M 240 520 Q 420 570 620 520" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="35" strokeLinecap="round" />
          </g>
        </g>
      </g>

      {/* Subtle outline of silhouette for grounding */}
      <g>
        <clipPath id="outlineClip" clipPathUnits="userSpaceOnUse">
          <RabbitClipShapes />
        </clipPath>
        <g clipPath="url(#outlineClip)">
          <rect x="0" y="0" width={width} height={height} fill="transparent" />
        </g>
        <g opacity="0.35" fill="none" stroke="#d9c089">
          <ellipse cx="440" cy="380" rx="230" ry="180" strokeWidth="2" />
          <circle cx="610" cy="260" r="95" strokeWidth="1.8" />
          <circle cx="275" cy="380" r="45" strokeWidth="1.5" />
          <path d="M580 95 C 560 50, 520 45, 505 115 C 490 180, 550 185, 565 145 C 575 125, 585 115, 580 95 Z" strokeWidth="1" />
          <path d="M640 90 C 660 35, 705 30, 720 110 C 735 190, 665 185, 650 140 C 642 118, 632 108, 640 90 Z" strokeWidth="1" />
        </g>
      </g>

      {/* Eye detail for realism */}
      <g>
        <circle cx="640" cy="250" r="7" fill="#1c1b1a" opacity="0.85" />
        <circle cx="642" cy="248" r="2.3" fill="#ffffff" opacity="0.9" />
      </g>
    </svg>
  )
}
