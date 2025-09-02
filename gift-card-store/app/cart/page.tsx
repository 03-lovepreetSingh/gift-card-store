'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { CartItemComponent } from '@/components/cart/cart-item'
import { mockCartItems, CartItem } from '@/lib/mockData'
import { ShoppingBag, ArrowRight, Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems)
  const { toast } = useToast()

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
    toast({
      title: 'Cart updated',
      description: 'Item quantity has been updated.',
    })
  }

  const removeItem = (id: string) => {
    const item = cartItems.find(item => item.id === id)
    setCartItems(items => items.filter(item => item.id !== id))
    toast({
      title: 'Item removed',
      description: `${item?.giftCard.brand} gift card removed from cart.`,
    })
  }

  const clearCart = () => {
    setCartItems([])
    toast({
      title: 'Cart cleared',
      description: 'All items have been removed from your cart.',
    })
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.giftCard.price * item.quantity), 0)
  const cryptoTotal = cartItems.reduce((sum, item) => {
    const cryptoPrice = parseFloat(item.giftCard.cryptoPrice)
    return sum + (cryptoPrice * item.quantity)
  }, 0)

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground">
              Start shopping to add gift cards to your cart
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/shop">
              Browse Gift Cards
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart
          </p>
          <Button variant="ghost" size="sm" onClick={clearCart}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Cart
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItemComponent
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Crypto equivalent</span>
                  <span>{cryptoTotal.toFixed(3)} ETH</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <div className="text-right">
                    <div>${subtotal.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground font-normal">
                      {cryptoTotal.toFixed(3)} ETH
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <Button asChild size="lg" className="w-full">
                  <Link href="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/shop">Continue Shopping</Link>
                </Button>
              </div>

              <div className="pt-4 space-y-2">
                <Badge variant="secondary" className="w-full justify-center py-2">
                  <ShoppingBag className="h-3 w-3 mr-1" />
                  Secure Checkout
                </Badge>
                <p className="text-xs text-muted-foreground text-center">
                  Your gift cards will be delivered instantly after payment confirmation
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}