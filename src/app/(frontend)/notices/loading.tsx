import { Skeleton } from '@/components/ui/Skeleton'

export default function NoticesLoading() {
  return (
    <div>
      <div className="bg-green-900 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-3">
          <Skeleton className="h-3 w-32 bg-green-800" />
          <Skeleton className="h-10 w-44 bg-green-800" />
          <Skeleton className="h-4 w-72 bg-green-800" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14">
        {/* Stats Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-green-50 border border-green-100 rounded-xl p-4 text-center space-y-2"
            >
              <Skeleton className="h-8 w-8 mx-auto rounded-full" />
              <Skeleton className="h-8 w-12 mx-auto" />
              <Skeleton className="h-3 w-20 mx-auto" />
            </div>
          ))}
        </div>

        {/* Notices Skeleton */}
        <div className="flex flex-col gap-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-l-4 border-l-gray-200 border-gray-200 rounded-xl p-4 md:p-5 flex gap-4"
            >
              <Skeleton className="w-10 h-10 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-16 rounded-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex gap-4">
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="w-5 h-5 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
