"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/product/product-card"
import { transformApiDataToGiftCards } from "@/lib/data-transformer"
import { ArrowRight, Shield, Zap, Globe, Star } from "lucide-react"
import { useEffect, useState } from "react"
import type { GiftCard } from "@/lib/types"

export default function HomePage() {
  const [featuredCards, setFeaturedCards] = useState<GiftCard[]>([])
  const [trendingCards, setTrendingCards] = useState<GiftCard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGiftCards = async () => {
      try {
        const response = await fetch("https://gift-card-store-backend.onrender.com/brand/")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const apiData = await response.json()
        const transformedData = transformApiDataToGiftCards(apiData)

        setFeaturedCards(transformedData.slice(0, 4))
        setTrendingCards(transformedData.slice(0, 6))
      } catch (error) {
        console.error("Failed to fetch gift cards:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGiftCards()
  }, [])

  return (
    <div className="flex flex-col bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-neutral-500/10 via-black to-neutral-600/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="outline" className="mb-4 border-neutral-500 text-neutral-500">
              <Zap className="h-3 w-3 mr-1" />
              Now supporting 15+ cryptocurrencies
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              Buy Gift Cards with{" "}
              <span className="bg-gradient-to-r from-neutral-500 to-neutral-600 bg-clip-text text-transparent">
                Crypto
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The most secure and convenient way to purchase gift cards using cryptocurrency. Instant delivery,
              competitive rates, and 24/7 support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="text-lg bg-neutral-500 hover:bg-neutral-600 text-white">
                <Link href="/shop">
                  Shop Gift Cards
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg border-gray-600 text-white hover:bg-gray-800 bg-transparent"
              >
                <Link href="/login">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Why Choose CryptoCards?</h2>
            <p className="text-gray-300">
              Experience the future of gift card purchases with our secure and efficient platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center bg-gray-800 border-gray-700">
              <CardContent className="pt-6">
                <div className="h-12 w-12 bg-neutral-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-neutral-500" />
                </div>
                <h3 className="font-semibold mb-2 text-white">Bank-Level Security</h3>
                <p className="text-sm text-gray-300">
                  Advanced encryption and multi-signature wallets protect your transactions
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gray-800 border-gray-700">
              <CardContent className="pt-6">
                <div className="h-12 w-12 bg-neutral-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-neutral-500" />
                </div>
                <h3 className="font-semibold mb-2 text-white">Instant Delivery</h3>
                <p className="text-sm text-gray-300">Receive your gift cards immediately after payment confirmation</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gray-800 border-gray-700">
              <CardContent className="pt-6">
                <div className="h-12 w-12 bg-neutral-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-neutral-500" />
                </div>
                <h3 className="font-semibold mb-2 text-white">Global Brands</h3>
                <p className="text-sm text-gray-300">Access to 500+ brands and services available worldwide</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-white">Featured Brands</h2>
              <p className="text-gray-300">Popular gift cards from trusted brands</p>
            </div>
            <Button asChild variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
              <Link href="/shop">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-lg h-64 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCards.map((card) => (
                <ProductCard key={card.id} giftCard={card} onAddToCart={() => {}} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trending Gift Cards */}
      <section className="py-16 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center text-white">
                <Star className="h-6 w-6 mr-2 text-neutral-500" />
                Trending Gift Cards
              </h2>
              <p className="text-gray-300">Most popular choices this week</p>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-lg h-64 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingCards.map((card) => (
                <ProductCard key={card.id} giftCard={card} onAddToCart={() => {}} />
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Button asChild size="lg" className="bg-neutral-500 hover:bg-neutral-600 text-white">
              <Link href="/shop">
                Explore All Gift Cards
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-neutral-500/10 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Shopping?</h2>
            <p className="text-xl opacity-90">
              Join thousands of users who trust CryptoCards for their gift card purchases
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="text-lg bg-white text-neutral-500 hover:bg-gray-100"
              >
                <Link href="/shop">Browse Gift Cards</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg border-white text-white hover:bg-white/10 bg-transparent"
              >
                <Link href="/login">Create Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
