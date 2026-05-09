import { Skeleton } from '@/components/ui/Skeleton'

export default function FacultyLoading() {
  return (
    <div>
      {/* Header Skeleton */}
      <div className="bg-green-900 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-3">
          <Skeleton className="h-3 w-32 bg-green-800" />
          <Skeleton className="h-10 w-52 bg-green-800" />
          <Skeleton className="h-4 w-72 bg-green-800" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14">
        {/* HOD Skeleton */}
        <div className="bg-gradient-to-br from-green-900 to-green-700 rounded-2xl p-6 md:p-8 mb-12 flex flex-col md:flex-row gap-6 items-center">
          <Skeleton className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-green-800 flex-shrink-0" />
          <div className="flex-1 space-y-3 w-full">
            <Skeleton className="h-5 w-32 bg-green-800" />
            <Skeleton className="h-8 w-64 bg-green-800" />
            <Skeleton className="h-4 w-48 bg-green-800" />
            <Skeleton className="h-4 w-56 bg-green-800" />
          </div>
        </div>

        {/* Faculty Grid Skeleton */}
        {[...Array(2)].map((_, gi) => (
          <div key={gi} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Skeleton className="h-7 w-44" />
              <div className="flex-1 h-px bg-gray-200" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <Skeleton className="w-full aspect-square" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
