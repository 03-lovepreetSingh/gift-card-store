import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Package, ExternalLink } from 'lucide-react'
import { Order } from '@/lib/mockData'

interface OrderCardProps {
  order: Order
}

export function OrderCard({ order }: OrderCardProps) {
  const getStatusVariant = (status: Order['status']) => {
    switch (status) {
      case 'fulfilled':
        return 'default'
      case 'paid':
        return 'secondary'
      case 'pending':
        return 'outline'
      case 'failed':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'fulfilled':
        return 'text-green-600'
      case 'paid':
        return 'text-blue-600'
      case 'pending':
        return 'text-yellow-600'
      case 'failed':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Order #{order.id}</CardTitle>
          <Badge variant={getStatusVariant(order.status)} className={getStatusColor(order.status)}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          {new Date(order.date).toLocaleDateString()}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Order Items */}
        <div className="space-y-2">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
              <div className="flex items-center space-x-3">
                <Package className="h-4 w-4 text-muted-foreground" />
                <div>
                  <span className="font-medium">{item.giftCard.brand}</span>
                  <span className="text-sm text-muted-foreground ml-2">
                    ${item.giftCard.denomination} × {item.quantity}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">
                  ${(item.giftCard.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Total */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total</span>
            <div className="text-right">
              <div className="font-semibold text-lg">${order.total.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">{order.cryptoTotal}</div>
            </div>
          </div>
        </div>

        {/* Transaction Hash */}
        {order.txHash && (
          <div className="pt-2">
            <Button variant="outline" size="sm" asChild>
              <Link 
                href={`https://etherscan.io/tx/${order.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Transaction
                <ExternalLink className="h-3 w-3 ml-2" />
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}