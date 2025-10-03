export default function InfoPanel() {
  return (
    <section className="bg-zinc-950/40 rounded-xl ring-1 ring-zinc-800/60 p-4">
      <h3 className="text-base font-medium mb-2">About this piece</h3>
      <p className="text-sm text-zinc-400 leading-relaxed">
        This artwork renders a realistic rabbit silhouette filled with hundreds of individually curved spaghetti strands. Use the controls to tweak noodle density, curl, thickness, colors, and add tomato sauce or parmesan flakes. The result is procedurally generated on your device, so identical seeds reproduce the same rabbit.
      </p>
      <div className="mt-4 text-xs text-zinc-500">
        Tip: Try higher density, slightly thinner noodles, and a dark background for a photographic, plated look.
      </div>
    </section>
  )
}
