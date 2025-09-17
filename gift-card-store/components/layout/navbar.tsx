'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { Search, ShoppingCart, User, Menu, X, Sun, Moon } from 'lucide-react'

// Extend the Window interface to include the ENV property
declare global {
  interface Window {
    ENV: {
      NEXT_PUBLIC_APP_URL: string;
    };
  }
}
interface User {
  id: string;
  name: string;
  email: string;
}

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { isAuthenticated, user, logout } = useAuth()
  const { totalItems } = useCart()
  const router = useRouter()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-neutral-900 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{
                  rotate: 10,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#ff7e5f]"
                >
                  <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
                  <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
                  <path d="M18 12a2 2 0 0 0 0 4h2v-4Z" />
                </svg>
              </motion.div>
              <span className="text-xl font-bold">GiftCrypto</span>
            </Link>
          </div>
          {/* Search Bar - Centered */}
          <div className="hidden md:flex md:flex-1 md:justify-center mx-4">
            <form onSubmit={handleSearch} className="w-full max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="search"
                  placeholder="Search for your favorite brands..."
                  className="w-full h-10 pl-10 pr-4 rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#ff7e5f]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            <nav className="flex items-center space-x-1">
              <Link
                href="/shop"
                className="px-3 py-2 text-sm font-medium hover:text-[#ff7e5f] transition-colors"
              >
                Shop
              </Link>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
              <Link
                href="/cart"
                className="relative p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-[#ff7e5f] text-white rounded-full text-xs flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center space-x-1 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                    <User className="h-5 w-5" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-neutral-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <div className="px-4 py-2 text-sm font-medium border-b border-neutral-200 dark:border-neutral-700">
                      {user?.name}
                    </div>
                    <Link
                      href="/user/profile"
                      className="block px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                    >
                      Orders
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/auth"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-black text-white hover:bg-black/90 px-4 py-2"
                >
                  Login/Sign up
                </Link>
              )}
            </nav>
          </div>
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-2">
            <Link
              href="/cart"
              className="relative p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#ff7e5f] text-white rounded-full text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: 'auto',
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="md:hidden border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input
                    type="search"
                    placeholder="Search for your favorite brands..."
                    className="w-full h-10 pl-10 pr-4 rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#ff7e5f]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
              <nav className="flex flex-col space-y-2">
                <Link
                  href="/"
                  className="py-2 text-sm font-medium hover:text-[#ff7e5f] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/shop"
                  className="py-2 text-sm font-medium hover:text-[#ff7e5f] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shop
                </Link>
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/user/profile"
                      className="py-2 text-sm font-medium hover:text-[#ff7e5f] transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/orders"
                      className="py-2 text-sm font-medium hover:text-[#ff7e5f] transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Orders
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setIsMenuOpen(false)
                      }}
                      className="py-2 text-sm font-medium text-left hover:text-[#ff7e5f] transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth"
                    className="py-2 text-sm font-medium hover:text-[#ff7e5f] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login/Sign up
                  </Link>
                )}
                <div className="flex items-center justify-between pt-2 border-t border-neutral-200 dark:border-neutral-700">
                  <span className="text-sm font-medium">Theme</span>
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    aria-label="Toggle theme"
                  >
                    {theme === 'dark' ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
