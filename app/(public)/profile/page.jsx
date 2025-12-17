'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import ProfileOverview from '@/components/profile/ProfileOverview'
import ProfilePictureUpload from '@/components/profile/ProfilePictureUpload'
import AddressManagement from '@/components/profile/AddressManagement'
import OrderHistory from '@/components/profile/OrderHistory'
import AccountSettings from '@/components/profile/AccountSettings'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User, MapPin, Package, Settings, CreditCard, HeadphonesIcon } from 'lucide-react'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    if (status === 'authenticated') {
      fetchProfileData()
    }
  }, [status, router])

  const fetchProfileData = async () => {
    try {
      const response = await fetch('/api/profile')
      if (response.ok) {
        const data = await response.json()
        setProfileData(data)
      } else {
        console.error('Failed to fetch profile data')
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleProfileUpdate = (updatedData) => {
    setProfileData(prev => ({
      ...prev,
      ...updatedData
    }))
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
        </div>

        {/* Profile Header Card */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <ProfilePictureUpload 
                  currentImage={profileData?.user?.image || profileData?.profile?.profilePicture}
                  onImageUpdate={handleProfileUpdate}
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {profileData?.profile?.firstName && profileData?.profile?.lastName 
                    ? `${profileData.profile.firstName} ${profileData.profile.lastName}`
                    : profileData?.user?.name || 'User'
                  }
                </h2>
                <p className="text-gray-600">{profileData?.user?.email}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Member since {new Date(profileData?.user?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Addresses</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Payments</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-2">
              <HeadphonesIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Support</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <ProfileOverview 
              profileData={profileData}
              onUpdate={handleProfileUpdate}
            />
          </TabsContent>

          <TabsContent value="addresses" className="space-y-6">
            <AddressManagement userId={profileData?.user?.id} />
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <OrderHistory userId={profileData?.user?.id} />
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Manage your saved payment methods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Payment method management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <AccountSettings 
              profileData={profileData}
              onUpdate={handleProfileUpdate}
            />
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Support</CardTitle>
                <CardDescription>
                  Get help with your orders and account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Support system coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}