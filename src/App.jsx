import { useState } from 'react'
import Header from './components/Header'
import Controls from './components/Controls'
import SpaghettiRabbit from './components/SpaghettiRabbit'
import InfoPanel from './components/InfoPanel'

export default function App() {
  const [seed, setSeed] = useState(1234)
  const [density, setDensity] = useState(280)
  const [curvature, setCurvature] = useState(0.55)
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [noodleColor, setNoodleColor] = useState('#f2d6a2')
  const [bgColor, setBgColor] = useState('#0b0b10')
  const [sauceEnabled, setSauceEnabled] = useState(true)
  const [sauceIntensity, setSauceIntensity] = useState(0.25)
  const [parmesanEnabled, setParmesanEnabled] = useState(true)

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black to-zinc-900 text-zinc-100">
      <Header />

      <main className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-zinc-950/40 rounded-xl ring-1 ring-zinc-800/60 p-3 md:p-4">
            <div className="aspect-[4/3] w-full rounded-lg overflow-hidden ring-1 ring-zinc-800/60 bg-black">
              <SpaghettiRabbit
                width={1600}
                height={1200}
                seed={seed}
                density={density}
                curvature={curvature}
                strokeWidth={strokeWidth}
                noodleColor={noodleColor}
                bgColor={bgColor}
                sauceEnabled={sauceEnabled}
                sauceIntensity={sauceIntensity}
                parmesanEnabled={parmesanEnabled}
              />
            </div>
          </div>
          <div className="lg:col-span-4 space-y-6">
            <Controls
              seed={seed}
              setSeed={setSeed}
              density={density}
              setDensity={setDensity}
              curvature={curvature}
              setCurvature={setCurvature}
              strokeWidth={strokeWidth}
              setStrokeWidth={setStrokeWidth}
              noodleColor={noodleColor}
              setNoodleColor={setNoodleColor}
              bgColor={bgColor}
              setBgColor={setBgColor}
              sauceEnabled={sauceEnabled}
              setSauceEnabled={setSauceEnabled}
              sauceIntensity={sauceIntensity}
              setSauceIntensity={setSauceIntensity}
              parmesanEnabled={parmesanEnabled}
              setParmesanEnabled={setParmesanEnabled}
            />
            <InfoPanel />
          </div>
        </div>
      </main>
    </div>
  )
}
