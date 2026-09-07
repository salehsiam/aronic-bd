export default function Loading() {
  return (
    <div className="min-h-screen bg-cotton animate-pulse">
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-24">
        <div className="h-4 w-40 bg-line mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div className="aspect-[3/4] bg-line" />
          <div>
            <div className="h-4 w-24 bg-line mb-3" />
            <div className="h-10 w-3/4 bg-line mb-6" />
            <div className="h-8 w-32 bg-line mb-8" />
            <div className="h-12 w-full bg-line" />
          </div>
        </div>
      </div>
    </div>
  )
}