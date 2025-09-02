import { AnalyticsCharts } from '@/components/admin/analytics-charts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockAnalytics, mockGiftCards, mockOrders } from '@/lib/mockData'
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from 'lucide-react'

export default function AdminAnalyticsPage() {
  // Calculate additional metrics
  const averageOrderValue = mockAnalytics.totalSales / mockAnalytics.totalOrders
  const topCategories = mockGiftCards.reduce((acc, card) => {
    acc[card.category] = (acc[card.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const categoryData = Object.entries(topCategories)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)

  const statusCounts = mockOrders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Detailed insights into your store's performance and trends
        </p>
      </div>

      {/* Main Analytics */}
      <AnalyticsCharts />

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Category Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryData.map((item, index) => (
                <div key={item.category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </div>
                    <span className="font-medium">{item.category}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{item.count} products</Badge>
                    {index === 0 && <TrendingUp className="h-4 w-4 text-green-600" />}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Order Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(statusCounts).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <span className="font-medium capitalize">{status}</span>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={
                        status === 'fulfilled' ? 'default' :
                        status === 'paid' ? 'secondary' :
                        status === 'pending' ? 'outline' : 'destructive'
                      }
                    >
                      {count} orders
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averageOrderValue.toFixed(2)}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +4.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products in Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockGiftCards.filter(card => card.inStock).length}
            </div>
            <p className="text-xs text-muted-foreground">
              of {mockGiftCards.length} total products
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Retention</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.5%</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}