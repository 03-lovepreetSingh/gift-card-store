'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Filter, ChevronDown, ChevronUp } from 'lucide-react'
import { categories } from '../../data/giftCards'
interface ProductFilterProps {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  priceRange: [number, number]
  setPriceRange: (range: [number, number]) => void
  sortBy: string
  setSortBy: (sort: string) => void
}
export function ProductFilter({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
}: ProductFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Set initial value
    handleResize()
    
    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }
  return (
    <div className="bg-card rounded-lg p-4 shadow-sm mb-6">
      <div
        className="flex items-center justify-between cursor-pointer md:cursor-default"
        onClick={toggleFilter}
      >
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <h3 className="font-medium">Filters</h3>
        </div>
        <div className="md:hidden">
          {isFilterOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
      </div>
      <motion.div
        initial={{
          height: 0,
        }}
        animate={{
          height: isFilterOpen || !isMobile ? 'auto' : 0,
        }}
        transition={{
          duration: 0.3,
        }}
        className="overflow-hidden"
      >
        <div className="pt-4 space-y-6">
          {/* Categories */}
          <div>
            <h4 className="text-sm font-medium mb-2">Categories</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${selectedCategory === category ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          {/* Price Range */}
          <div>
            <h4 className="text-sm font-medium mb-2">Price Range</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs">${priceRange[0]}</span>
                <span className="text-xs">${priceRange[1]}</span>
              </div>
              <div className="flex space-x-4">
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([parseInt(e.target.value), priceRange[1]])
                  }
                  className="w-full accent-primary"
                />
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full accent-primary"
                />
              </div>
            </div>
          </div>
          {/* Sort By */}
          <div>
            <h4 className="text-sm font-medium mb-2">Sort By</h4>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 text-sm bg-muted rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="discount-desc">Highest Discount</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
