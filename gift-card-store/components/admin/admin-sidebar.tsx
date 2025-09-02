'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3,
  Settings,
  LogOut,
  Store
} from 'lucide-react'

const adminNavItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard
  },
  {
    title: 'Products',
    href: '/admin/products',
    icon: Package
  },
  {
    title: 'Orders',
    href: '/admin/orders',
    icon: ShoppingCart
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: Users
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings
  }
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="pb-12 w-64">
      <div className="space-y-4 py-4">
        {/* Logo */}
        <div className="px-3 py-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Store className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">CryptoCards</span>
          </Link>
          <p className="text-sm text-muted-foreground mt-1">Admin Panel</p>
        </div>

        {/* Navigation */}
        <div className="px-3">
          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Navigation
            </h2>
            <ScrollArea>
              <div className="space-y-1">
                {adminNavItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  
                  return (
                    <Button
                      key={item.href}
                      variant={isActive ? 'secondary' : 'ghost'}
                      className={cn(
                        'w-full justify-start',
                        isActive && 'bg-secondary'
                      )}
                      asChild
                    >
                      <Link href={item.href}>
                        <Icon className="mr-2 h-4 w-4" />
                        {item.title}
                      </Link>
                    </Button>
                  )
                })}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="px-3">
          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Account
            </h2>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/">
                <Store className="mr-2 h-4 w-4" />
                Back to Store
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}