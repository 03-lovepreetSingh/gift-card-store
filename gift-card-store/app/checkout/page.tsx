'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { mockCartItems } from '@/lib/mockData'
import { Wallet, CreditCard, Shield, ArrowLeft, CheckCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('crypto')
  const [isProcessing, setIsProcessing] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const { toast } = useToast()

  const cartItems = mockCartItems
  const subtotal = cartItems.reduce((sum, item) => sum + (item.giftCard.price * item.quantity), 0)
  const cryptoTotal = cartItems.reduce((sum, item) => {
    const cryptoPrice = parseFloat(item.giftCard.cryptoPrice)
    return sum + (cryptoPrice * item.quantity)
  }, 0)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleConnectWallet = () => {
    setWalletConnected(true)
    toast({
      title: 'Wallet connected',
      description: 'Your wallet has been successfully connected.',
    })
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: 'Payment successful!',
        description: 'Your gift cards will be delivered to your email shortly.',
      })
    }, 3000)
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <h1 className="text-2xl font-bold">No items to checkout</h1>
          <p className="text-muted-foreground">
            Your cart is empty. Add some gift cards to proceed with checkout.
          </p>
          <Button asChild size="lg">
            <Link href="/shop">Browse Gift Cards</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/cart">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Section */}
        <div className="space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <RadioGroupItem value="crypto" id="crypto" />
                  <Label htmlFor="crypto" className="flex-1 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <Wallet className="h-5 w-5 text-orange-600" />
                      <div>
                        <div className="font-medium">Cryptocurrency</div>
                        <div className="text-sm text-muted-foreground">
                          Pay with ETH, BTC, or other supported cryptocurrencies
                        </div>
                      </div>
                    </div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3 p-4 border rounded-lg opacity-50">
                  <RadioGroupItem value="card" id="card" disabled />
                  <Label htmlFor="card" className="flex-1">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium">Credit Card</div>
                        <div className="text-sm text-muted-foreground">
                          Coming soon - Credit card payments
                        </div>
                      </div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod === 'crypto' && (
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  {!walletConnected ? (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Connect your wallet to complete the payment
                      </p>
                      <Button onClick={handleConnectWallet} className="w-full">
                        <Wallet className="h-4 w-4 mr-2" />
                        Connect Wallet
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Wallet Connected</span>
                      </div>
                      <div className="text-sm text-muted-foreground font-mono">
                        0x1234...5678
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cart Items */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2">
                    <div className="flex-1">
                      <div className="font-medium">{item.giftCard.brand}</div>
                      <div className="text-sm text-muted-foreground">
                        ${item.giftCard.denomination} × {item.quantity}
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

              <Separator />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Processing fee</span>
                  <span>Free</span>
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

              {/* Payment Button */}
              <div className="space-y-3 pt-4">
                <Button 
                  onClick={handlePayment}
                  disabled={!walletConnected || isProcessing}
                  size="lg" 
                  className="w-full"
                >
                  {isProcessing ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 mr-2" />
                      Complete Payment
                    </>
                  )}
                </Button>
                
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-full justify-center py-2">
                    <Shield className="h-3 w-3 mr-1" />
                    Secure Payment
                  </Badge>
                  <p className="text-xs text-muted-foreground text-center">
                    Your gift cards will be delivered instantly to your email after payment confirmation
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}