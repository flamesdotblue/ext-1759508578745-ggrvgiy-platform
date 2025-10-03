import { RefreshCw } from 'lucide-react'

export default function Controls({
  seed, setSeed,
  density, setDensity,
  curvature, setCurvature,
  strokeWidth, setStrokeWidth,
  noodleColor, setNoodleColor,
  bgColor, setBgColor,
  sauceEnabled, setSauceEnabled,
  sauceIntensity, setSauceIntensity,
  parmesanEnabled, setParmesanEnabled,
}) {
  const randomizeSeed = () => setSeed(Math.floor(Math.random() * 100000))

  return (
    <section className="bg-zinc-950/40 rounded-xl ring-1 ring-zinc-800/60 p-4 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Controls</h2>
        <button onClick={randomizeSeed} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-900 hover:bg-zinc-800 ring-1 ring-zinc-700 text-sm">
          <RefreshCw size={16} /> Randomize
        </button>
      </div>

      <div className="space-y-4">
        <LabeledInput label="Seed" description="Reproduce the same rabbit by using the same seed.">
          <div className="flex gap-2">
            <input
              type="number"
              value={seed}
              onChange={(e) => setSeed(Number(e.target.value || 0))}
              className="w-full bg-zinc-900 ring-1 ring-zinc-700 rounded-md px-3 py-2 outline-none focus:ring-amber-500/60"
            />
          </div>
        </LabeledInput>

        <LabeledInput label={`Noodle density: ${density}`} description="How many pasta strands fill the rabbit.">
          <input
            type="range"
            min={60}
            max={900}
            step={10}
            value={density}
            onChange={(e) => setDensity(Number(e.target.value))}
            className="w-full"
          />
        </LabeledInput>

        <LabeledInput label={`Curvature: ${curvature.toFixed(2)}`} description="How curly the noodles are.">
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={curvature}
            onChange={(e) => setCurvature(Number(e.target.value))}
            className="w-full"
          />
        </LabeledInput>

        <LabeledInput label={`Noodle thickness: ${strokeWidth.toFixed(1)}px`} description="Thickness of pasta strokes.">
          <input
            type="range"
            min={0.6}
            max={4}
            step={0.1}
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            className="w-full"
          />
        </LabeledInput>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <LabeledInput label="Noodle color" description="The pasta tone.">
            <input
              type="color"
              value={noodleColor}
              onChange={(e) => setNoodleColor(e.target.value)}
              className="w-full h-10 bg-zinc-900 ring-1 ring-zinc-700 rounded-md"
            />
          </LabeledInput>
          <LabeledInput label="Background" description="Canvas backdrop color.">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-full h-10 bg-zinc-900 ring-1 ring-zinc-700 rounded-md"
            />
          </LabeledInput>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <LabeledInput label="Tomato sauce" description="Add saucy accent strokes.">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={sauceEnabled}
                onChange={(e) => setSauceEnabled(e.target.checked)}
              />
              <span className="text-sm text-zinc-400">Enable</span>
            </div>
          </LabeledInput>
          <LabeledInput label={`Sauce intensity: ${(sauceIntensity * 100).toFixed(0)}%`} description="How many saucy strokes.">
            <input
              type="range"
              min={0}
              max={0.8}
              step={0.01}
              value={sauceIntensity}
              onChange={(e) => setSauceIntensity(Number(e.target.value))}
              className="w-full"
            />
          </LabeledInput>
        </div>

        <LabeledInput label="Parmesan" description="Dust the rabbit with cheese flakes.">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={parmesanEnabled}
              onChange={(e) => setParmesanEnabled(e.target.checked)}
            />
            <span className="text-sm text-zinc-400">Sprinkle</span>
          </div>
        </LabeledInput>
      </div>
    </section>
  )
}

function LabeledInput({ label, description, children }) {
  return (
    <div className="space-y-2">
      <div>
        <div className="text-sm font-medium">{label}</div>
        {description && <div className="text-xs text-zinc-400">{description}</div>}
      </div>
      {children}
    </div>
  )
}
