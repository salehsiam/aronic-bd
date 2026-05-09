import { Skeleton } from '@/components/ui/Skeleton'

export default function NoticeDetailLoading() {
  return (
    <div>
      {/* Header Skeleton */}
      <div className="bg-green-900 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-4">
          <Skeleton className="h-3 w-48 bg-green-800" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full bg-green-800" />
            <Skeleton className="h-6 w-24 rounded-full bg-green-800" />
          </div>
          <Skeleton className="h-10 w-full bg-green-800" />
          <Skeleton className="h-10 w-3/4 bg-green-800" />
          <div className="flex gap-4 mt-2">
            <Skeleton className="h-4 w-36 bg-green-800" />
            <Skeleton className="h-4 w-28 bg-green-800" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Notice Content */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 space-y-3">
              <Skeleton className="h-7 w-40 mb-4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Attachments */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-3">
              <Skeleton className="h-7 w-32 mb-4" />
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Skeleton className="w-12 h-12 rounded-xl flex-shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                </div>
              ))}
            </div>

            <Skeleton className="h-4 w-36" />
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Notice Info */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
              <Skeleton className="h-7 w-28 mb-2" />
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center pt-3 border-t border-gray-100 first:border-0 first:pt-0"
                >
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-5 w-24 rounded-full" />
                </div>
              ))}
            </div>

            {/* Recent Notices */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
              <Skeleton className="h-7 w-36 mb-2" />
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-3 p-2">
                  <Skeleton className="w-8 h-8 rounded-lg flex-shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-4/5" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-2">
              <Skeleton className="h-7 w-28 mb-2" />
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-9 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
