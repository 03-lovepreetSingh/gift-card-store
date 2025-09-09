"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star, Percent } from "lucide-react"
import type { GiftCard } from "@/lib/types"

interface ProductCardProps {
  giftCard: GiftCard
  onAddToCart?: (giftCard: GiftCard) => void
}

export function ProductCard({ giftCard, onAddToCart }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/20 bg-card border-border">
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={giftCard.image || "/placeholder.svg"}
          alt={giftCard.brand}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        {giftCard.isPopular && (
          <Badge variant="popular" className="absolute top-2 left-2">
            <Star className="h-3 w-3 mr-1" />
            Popular
          </Badge>
        )}
        {giftCard.discountPercentage && giftCard.discountPercentage > 0 && (
          <Badge className="absolute top-2 right-2 bg-green-600 hover:bg-green-700 text-white">
            <Percent className="h-3 w-3 mr-1" />
            {giftCard.discountPercentage}% OFF
          </Badge>
        )}
        {!giftCard.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="destructive">Out of Stock</Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg text-foreground">{giftCard.brand}</h3>
            <Badge variant="outline" className="text-muted-foreground border-border">
              {giftCard.category}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{giftCard.description}</p>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-foreground">${giftCard.denomination}</span>
              <div className="text-sm text-muted-foreground">{giftCard.cryptoPrice}</div>
              {giftCard.availableDenominations.length > 1 && (
                <div className="text-xs text-muted-foreground mt-1">
                  Available: ${giftCard.availableDenominations.join(", $")}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 space-x-2">
        <Button
          asChild
          variant="outline"
          className="flex-1 bg-secondary hover:bg-secondary/80 text-secondary-foreground border-border"
        >
          <Link href={`/shop/${giftCard.id}`}>View Details</Link>
        </Button>
        <Button
          onClick={() => onAddToCart?.(giftCard)}
          disabled={!giftCard.inStock}
          size="icon"
          className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
