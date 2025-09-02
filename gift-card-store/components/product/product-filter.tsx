'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { categories, brands } from '@/lib/mockData'
import { Filter, X } from 'lucide-react'

interface ProductFilterProps {
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  categories: string[]
  brands: string[]
  priceRange: [number, number]
  sortBy: string
}

export function ProductFilter({ onFilterChange }: ProductFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRange: [0, 200],
    sortBy: 'popular'
  })

  const [isOpen, setIsOpen] = useState(false)

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFilterChange(updated)
  }

  const resetFilters = () => {
    const reset: FilterState = {
      categories: [],
      brands: [],
      priceRange: [0, 200],
      sortBy: 'popular'
    }
    setFilters(reset)
    onFilterChange(reset)
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked 
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category)
    updateFilters({ categories: newCategories })
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked 
      ? [...filters.brands, brand]
      : filters.brands.filter(b => b !== brand)
    updateFilters({ brands: newBrands })
  }

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-6">
        <Button 
          variant="outline" 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Filter Panel */}
      <Card className={`lg:sticky lg:top-20 ${isOpen ? 'block' : 'hidden lg:block'}`}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Filters</CardTitle>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              Clear All
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sort By */}
          <div className="space-y-2">
            <Label>Sort By</Label>
            <Select value={filters.sortBy} onValueChange={(value) => updateFilters({ sortBy: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="brand">Brand A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="space-y-4">
            <Label>Price Range</Label>
            <div className="px-2">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
                max={200}
                min={0}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <Label>Categories</Label>
            <div className="space-y-2">
              {categories.filter(cat => cat !== 'All').map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, !!checked)}
                  />
                  <Label htmlFor={`category-${category}`} className="text-sm font-normal">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="space-y-3">
            <Label>Brands</Label>
            <div className="space-y-2">
              {brands.filter(brand => brand !== 'All').map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={filters.brands.includes(brand)}
                    onCheckedChange={(checked) => handleBrandChange(brand, !!checked)}
                  />
                  <Label htmlFor={`brand-${brand}`} className="text-sm font-normal">
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}