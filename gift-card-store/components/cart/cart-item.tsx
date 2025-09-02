'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Trash2, Plus, Minus } from 'lucide-react'
import { CartItem } from '@/lib/mockData'

interface CartItemProps {
  item: CartItem
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export function CartItemComponent({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const subtotal = item.giftCard.price * item.quantity

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Product Image */}
          <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden">
            <Image
              src={item.giftCard.image}
              alt={item.giftCard.brand}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold">{item.giftCard.brand}</h3>
                <p className="text-sm text-muted-foreground">
                  ${item.giftCard.denomination} Gift Card
                </p>
                <p className="text-sm text-muted-foreground">
                  {item.giftCard.cryptoPrice} each
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${subtotal.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">
                  {(parseFloat(item.giftCard.cryptoPrice) * item.quantity).toFixed(3)} ETH
                </p>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => onUpdateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center"
                  min="1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(item.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}