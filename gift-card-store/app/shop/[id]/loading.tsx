import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb skeleton */}
      <Skeleton className="h-10 w-32 mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image skeleton */}
        <div className="space-y-4">
          <Skeleton className="aspect-square w-full rounded-lg" />
        </div>

        {/* Product Details skeleton */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-20 w-full" />
          </div>

          {/* Pricing skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-6 w-24" />

            {/* Quantity selector skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <div className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-10 w-10" />
              </div>
            </div>

            {/* Total card skeleton */}
            <Card>
              <CardContent className="p-4 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>

            {/* Add to cart button skeleton */}
            <Skeleton className="h-12 w-full" />
          </div>

          {/* Features skeleton */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <Skeleton className="h-5 w-5" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
