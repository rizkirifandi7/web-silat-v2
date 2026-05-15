import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="bg-background min-h-screen">
      {/* 1. Page Header Skeleton */}
      <section className="relative py-20 overflow-hidden bg-background">
        <div className="w-full max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center">
          <Skeleton className="h-12 w-3/4 md:w-1/2 mb-4" />
          <Skeleton className="h-6 w-full max-w-2xl" />
        </div>
      </section>

      {/* 2. Sejarah Skeleton */}
      <section className="py-20">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3 w-full">
              <Skeleton className="h-4 w-32 mb-4" />
              <Skeleton className="h-10 w-3/4 mb-6" />
              <Skeleton className="aspect-video md:aspect-3/4 w-full rounded-2xl" />
            </div>
            <div className="md:w-2/3 w-full space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="h-4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <div className="h-4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pendiri Skeleton */}
      <section className="py-20 bg-background">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center mb-16 space-y-4">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 w-64 md:w-96" />
            <Skeleton className="h-6 w-full max-w-2xl" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col space-y-4">
                <Skeleton className="aspect-3/4 w-full rounded-2xl" />
                <div className="space-y-2 flex flex-col items-center">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Filosofi Skeleton */}
      <section className="py-20">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 flex flex-col items-center">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-6 w-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <div className="space-y-8">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div className="flex justify-center">
              <Skeleton className="w-64 h-64 rounded-full" />
            </div>
            <div className="space-y-8">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
