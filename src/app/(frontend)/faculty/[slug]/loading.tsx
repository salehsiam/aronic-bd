import { Skeleton } from '@/components/ui/Skeleton'

export default function FacultyDetailLoading() {
  return (
    <div>
      {/* Header Skeleton */}
      <div className="bg-green-900 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <Skeleton className="h-3 w-48 bg-green-800 mb-6" />
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start">
            {/* Photo */}
            <Skeleton className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-green-800 flex-shrink-0" />
            {/* Info */}
            <div className="space-y-3 w-full text-center md:text-left">
              <Skeleton className="h-5 w-32 bg-green-800 mx-auto md:mx-0" />
              <Skeleton className="h-10 w-72 bg-green-800 mx-auto md:mx-0" />
              <Skeleton className="h-5 w-48 bg-green-800 mx-auto md:mx-0" />
              <Skeleton className="h-4 w-56 bg-green-800 mx-auto md:mx-0" />
              <Skeleton className="h-4 w-44 bg-green-800 mx-auto md:mx-0" />
              <div className="flex gap-4 justify-center md:justify-start pt-1">
                <Skeleton className="h-4 w-40 bg-green-800" />
                <Skeleton className="h-4 w-32 bg-green-800" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Biography */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-3">
              <Skeleton className="h-7 w-32 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            {/* Research Interests */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <Skeleton className="h-7 w-44 mb-4" />
              <div className="flex flex-wrap gap-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-24 rounded-full" />
                ))}
              </div>
            </div>

            {/* Publications */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
              <Skeleton className="h-7 w-32 mb-2" />
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                  <Skeleton className="w-12 h-8 flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                    <Skeleton className="h-5 w-28 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
              <Skeleton className="h-7 w-28 mb-2" />
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between pt-3 border-t border-gray-100 first:border-0 first:pt-0"
                >
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-24" />
                </div>
              ))}
            </div>

            {/* Qualifications */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
              <Skeleton className="h-7 w-36 mb-2" />
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="w-2 h-2 rounded-full flex-shrink-0" />
                  <Skeleton className="h-3 w-32" />
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="bg-green-50 border border-green-100 rounded-xl p-5 space-y-3">
              <Skeleton className="h-7 w-24 mb-2" />
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="w-8 h-8 rounded-lg flex-shrink-0" />
                  <Skeleton className="h-3 w-40" />
                </div>
              ))}
            </div>

            {/* Book Appointment */}
            <div className="bg-green-900 rounded-xl p-5 text-center space-y-3">
              <Skeleton className="w-10 h-10 rounded-full mx-auto bg-green-800" />
              <Skeleton className="h-6 w-36 mx-auto bg-green-800" />
              <Skeleton className="h-3 w-48 mx-auto bg-green-800" />
              <Skeleton className="h-10 w-full rounded-lg bg-green-800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
