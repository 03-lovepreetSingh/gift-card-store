import { OrderCard } from '@/components/order/order-card'
import { mockOrders } from '@/lib/mockData'
import { Package, Calendar } from 'lucide-react'

export default function OrdersPage() {
  if (mockOrders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
            <Package className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">No orders yet</h1>
            <p className="text-muted-foreground">
              Your order history will appear here after making purchases
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Order History</h1>
        <div className="flex items-center text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{mockOrders.length} order{mockOrders.length !== 1 ? 's' : ''} found</span>
        </div>
      </div>

      <div className="space-y-6">
        {mockOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  )
}