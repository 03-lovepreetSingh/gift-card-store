import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AnalyticsCharts } from '@/components/admin/analytics-charts'
import { mockAnalytics, mockOrders, mockUsers } from '@/lib/mockData'
import { TrendingUp, DollarSign, ShoppingCart, Users, AlertCircle, CheckCircle } from 'lucide-react'

export default function AdminDashboard() {
  const recentOrders = mockOrders.slice(0, 5)
  const pendingOrders = mockOrders.filter(order => order.status === 'pending').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your store.
        </p>
      </div>

      {/* Alert Cards */}
      {pendingOrders > 0 && (
        <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium">
                You have {pendingOrders} pending order{pendingOrders !== 1 ? 's' : ''} that need attention
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analytics Charts */}
      <AnalyticsCharts />

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div>
                    <div className="font-medium">#{order.id}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(order.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${order.total.toFixed(2)}</div>
                    <Badge 
                      variant={
                        order.status === 'fulfilled' ? 'default' :
                        order.status === 'paid' ? 'secondary' :
                        order.status === 'pending' ? 'outline' : 'destructive'
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Users */}
        <Card>
          <CardHeader>
            <CardTitle>Top Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockUsers.map((user, index) => (
                <div key={user.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">#{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                  <Badge variant="secondary">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}