'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Wallet, Copy, CheckCircle } from 'lucide-react'

interface UserData {
  name: string
  email: string
  bio: string
  walletAddress?: string
  notifications: {
    orderUpdates: boolean
    promotions: boolean
    newsletter: boolean
  }
}

export function UserProfileForm() {
  const [userData, setUserData] = useState<UserData>({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Crypto enthusiast and gift card collector',
    walletAddress: '0x1234567890123456789012345678901234567890',
    notifications: {
      orderUpdates: true,
      promotions: false,
      newsletter: true
    }
  })

  const [isWalletConnected, setIsWalletConnected] = useState(!!userData.walletAddress)
  const [copied, setCopied] = useState(false)

  const handleInputChange = (field: keyof UserData, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (field: keyof UserData['notifications'], value: boolean) => {
    setUserData(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [field]: value }
    }))
  }

  const copyWalletAddress = async () => {
    if (userData.walletAddress) {
      await navigator.clipboard.writeText(userData.walletAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const connectWallet = () => {
    // Simulate wallet connection
    setIsWalletConnected(true)
    setUserData(prev => ({
      ...prev,
      walletAddress: '0x1234567890123456789012345678901234567890'
    }))
  }

  const disconnectWallet = () => {
    setIsWalletConnected(false)
    setUserData(prev => ({ ...prev, walletAddress: undefined }))
  }

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={userData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={userData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              value={userData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Wallet Connection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wallet className="h-5 w-5" />
            <span>Wallet Connection</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isWalletConnected ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-green-600">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Connected
                </Badge>
                <Button variant="outline" size="sm" onClick={disconnectWallet}>
                  Disconnect
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Wallet Address</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    value={userData.walletAddress}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyWalletAddress}
                  >
                    {copied ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Connect your wallet to make purchases with cryptocurrency
              </p>
              <Button onClick={connectWallet}>
                <Wallet className="h-4 w-4 mr-2" />
                Connect Wallet
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="order-updates">Order Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about your order status changes
                </p>
              </div>
              <Switch
                id="order-updates"
                checked={userData.notifications.orderUpdates}
                onCheckedChange={(checked) => handleNotificationChange('orderUpdates', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="promotions">Promotions</Label>
                <p className="text-sm text-muted-foreground">
                  Receive special offers and discounts
                </p>
              </div>
              <Switch
                id="promotions"
                checked={userData.notifications.promotions}
                onCheckedChange={(checked) => handleNotificationChange('promotions', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="newsletter">Newsletter</Label>
                <p className="text-sm text-muted-foreground">
                  Weekly updates on new gift cards and features
                </p>
              </div>
              <Switch
                id="newsletter"
                checked={userData.notifications.newsletter}
                onCheckedChange={(checked) => handleNotificationChange('newsletter', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}