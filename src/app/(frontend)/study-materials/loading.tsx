import { Skeleton } from '@/components/ui/Skeleton'

export default function StudyMaterialsLoading() {
  return (
    <div>
      <div className="bg-green-900 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-3">
          <Skeleton className="h-3 w-32 bg-green-800" />
          <Skeleton className="h-10 w-48 bg-green-800" />
          <Skeleton className="h-4 w-72 bg-green-800" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-green-50 border border-green-100 rounded-xl p-4 text-center space-y-2"
            >
              <Skeleton className="h-8 w-8 mx-auto rounded-full" />
              <Skeleton className="h-8 w-12 mx-auto" />
              <Skeleton className="h-3 w-24 mx-auto" />
            </div>
          ))}
        </div>

        {[...Array(2)].map((_, si) => (
          <div key={si} className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <Skeleton className="h-7 w-48" />
              <div className="flex-1 h-px bg-gray-200" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
                  <div className="flex justify-between">
                    <Skeleton className="h-6 w-28 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-9 w-full rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
