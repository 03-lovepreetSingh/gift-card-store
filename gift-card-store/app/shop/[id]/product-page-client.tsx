// app/shop/[id]/product-page-client.tsx  (Client Component)
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, ShoppingCart, Plus, Minus, Shield, Zap, Globe, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ProductPageClient({
  giftCard,
  allCards,
}: {
  giftCard: any
  allCards: any[]
}) {
  const [quantity, setQuantity] = useState(1)
  const { toast } = useToast()

  const relatedCards = allCards
    .filter((card) => card.category === giftCard.category && card.id !== giftCard.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} ${giftCard.brand} gift card${quantity > 1 ? "s" : ""} added to your cart.`,
    })
  }

  const totalPrice = giftCard.price * quantity
  const totalCrypto = (Number.parseFloat(giftCard.cryptoPrice) * quantity).toFixed(3)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/shop">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
            <Image src={giftCard.image} alt={giftCard.brand} fill className="object-cover" />
            {giftCard.isPopular && (
              <Badge className="absolute top-4 left-4 bg-orange-500 hover:bg-orange-600">
                <Star className="h-3 w-3 mr-1" />
                Popular
              </Badge>
            )}
            {!giftCard.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="destructive" className="text-lg px-4 py-2">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{giftCard.category}</Badge>
              {giftCard.inStock ? (
                <Badge variant="secondary">In Stock</Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-4">{giftCard.brand} Gift Card</h1>
            <p className="text-muted-foreground text-lg mb-4">{giftCard.description}</p>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <div>
              <div className="text-3xl font-bold">${giftCard.denomination}</div>
              <div className="text-lg text-muted-foreground">{giftCard.cryptoPrice}</div>
            </div>

            <Separator />

            {/* Quantity Selector */}
            <div className="space-y-4">
              <Label htmlFor="quantity">Quantity</Label>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  className="w-20 text-center"
                  min="1"
                  max="10"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= 10}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Total */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Subtotal:</span>
                    <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Crypto Price:</span>
                    <span className="font-semibold">{totalCrypto} ETH</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add to Cart */}
            <div className="space-y-2">
              <Button onClick={handleAddToCart} disabled={!giftCard.inStock} size="lg" className="w-full">
                <ShoppingCart className="h-5 w-5 mr-2" />
                {giftCard.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
              {giftCard.inStock && (
                <p className="text-sm text-muted-foreground text-center">Instant delivery after payment confirmation</p>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <Shield className="h-5 w-5 text-green-600" />
              <div>
                <div className="font-medium">Secure Purchase</div>
                <div className="text-sm text-muted-foreground">Bank-level security</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <Zap className="h-5 w-5 text-blue-600" />
              <div>
                <div className="font-medium">Instant Delivery</div>
                <div className="text-sm text-muted-foreground">Delivered to your email</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <Globe className="h-5 w-5 text-purple-600" />
              <div>
                <div className="font-medium">Global Acceptance</div>
                <div className="text-sm text-muted-foreground">Works worldwide</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedCards.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Gift Cards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedCards.map((card) => (
              <Card key={card.id} className="group overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.brand}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{card.brand}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">${card.denomination}</span>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/shop/${card.id}`}>View</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
