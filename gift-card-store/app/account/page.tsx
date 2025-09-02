import { UserProfileForm } from '@/components/user/user-profile-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, ShoppingBag, Award, Calendar } from 'lucide-react'

export default function AccountPage() {
  // Mock user stats
  const userStats = {
    totalOrders: 15,
    totalSpent: 2450,
    memberSince: '2024-01-01',
    status: 'Gold Member'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Account</h1>
        <p className="text-muted-foreground">
          Manage your profile, preferences, and view your account activity
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Account Stats */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">{userStats.totalOrders}</p>
                </div>
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold">${userStats.totalSpent}</p>
                </div>
                <User className="h-8 w-8 text-muted-foreground" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                  <p className="text-2xl font-bold">
                    {new Date(userStats.memberSince).getFullYear()}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge variant="secondary" className="mt-1">
                    <Award className="h-3 w-3 mr-1" />
                    {userStats.status}
                  </Badge>
                </div>
                <Award className="h-8 w-8 text-muted-foreground" />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-3">
          <UserProfileForm />
        </div>
      </div>
    </div>
  )
}