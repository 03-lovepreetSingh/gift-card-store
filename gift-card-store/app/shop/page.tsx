"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import {
  ProductFilter,
  FilterState,
} from "@/components/product/product-filter";
import { mockGiftCards, GiftCard } from "@/lib/mockData";
import { Search, SlidersHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRange: [0, 200],
    sortBy: "popular",
  });

  const { toast } = useToast();

  const filteredProducts = useMemo(() => {
    let filtered = [...mockGiftCards];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        filters.categories.includes(product.category)
      );
    }

    // Brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter((product) =>
        filters.brands.includes(product.brand)
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    // Sort
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "brand":
        filtered.sort((a, b) => a.brand.localeCompare(b.brand));
        break;
      case "popular":
      default:
        filtered.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
        break;
    }

    return filtered;
  }, [searchQuery, filters]);

  const handleAddToCart = (giftCard: GiftCard) => {
    toast({
      title: "Added to cart",
      description: `${giftCard.brand} gift card added to your cart.`,
    });
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Gift Card Shop</h1>
          <p className="text-muted-foreground">
            Browse our collection of {mockGiftCards.length} gift cards from
            popular brands
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search gift cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilter onFilterChange={setFilters} />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} of {mockGiftCards.length} gift
                cards
              </p>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((giftCard) => (
                  <ProductCard
                    key={giftCard.id}
                    giftCard={giftCard}
                    onAddToCart={giftCard}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <SlidersHorizontal className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  No gift cards found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setFilters({
                      categories: [],
                      brands: [],
                      priceRange: [0, 200],
                      sortBy: "popular",
                    });
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
