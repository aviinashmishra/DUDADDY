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
import { User, MapPin, Package, Settings, CreditCard, HeadphonesIcon, Star } from 'lucide-react'

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
      console.log('Fetching profile data...')
      const response = await fetch('/api/profile')
      console.log('Profile response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Profile data received:', data)
        setProfileData(data)
      } else {
        const errorData = await response.json().catch(() => ({}))
        console.error('Failed to fetch profile data:', response.status, errorData)
        
        // Create a basic profile structure if API fails
        setProfileData({
          user: {
            id: session?.user?.id || 'temp-id',
            name: session?.user?.name || 'User',
            email: session?.user?.email || '',
            image: session?.user?.image || null,
            createdAt: new Date().toISOString(),
            role: 'user'
          },
          profile: null,
          preferences: null
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      
      // Create a basic profile structure if API fails
      setProfileData({
        user: {
          id: session?.user?.id || 'temp-id',
          name: session?.user?.name || 'User',
          email: session?.user?.email || '',
          image: session?.user?.image || null,
          createdAt: new Date().toISOString(),
          role: 'user'
        },
        profile: null,
        preferences: null
      })
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
      <div className="min-h-screen bg-[#0A0E1A] flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#de2529]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-[#de2529] to-[#ff3b3f] rounded-full opacity-20 animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#0A0E1A] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            My <span className="text-gradient">Profile</span>
          </h1>
          <p className="text-gray-400 text-lg">Manage your account settings and preferences</p>
        </div>

        {/* Profile Header Card */}
        <div className="card-dark mb-8 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-[#de2529] to-[#ff3b3f]"></div>
          </div>
          
          <div className="relative z-10 p-8">
            <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
              <div className="relative">
                <ProfilePictureUpload 
                  currentImage={profileData?.user?.image || profileData?.profile?.profilePicture}
                  onImageUpdate={handleProfileUpdate}
                />
              </div>
              <div className="text-center lg:text-left flex-1">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {profileData?.profile?.firstName && profileData?.profile?.lastName 
                    ? `${profileData.profile.firstName} ${profileData.profile.lastName}`
                    : profileData?.user?.name || 'User'
                  }
                </h2>
                <p className="text-gray-300 text-lg mb-2">{profileData?.user?.email}</p>
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-[#de2529]" />
                    <span>Member since {new Date(profileData?.user?.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Active Account</span>
                  </div>
                  {profileData?.user?.role === 'admin' && (
                    <div className="flex items-center gap-2">
                      <div className="px-2 py-1 bg-gradient-to-r from-[#de2529] to-[#ff3b3f] rounded-full text-xs font-semibold text-white">
                        ADMIN
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-[#0F1420] border border-[#1A2332] p-1 rounded-xl">
            <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#de2529] data-[state=active]:to-[#ff3b3f] data-[state=active]:text-white">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#de2529] data-[state=active]:to-[#ff3b3f] data-[state=active]:text-white">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Addresses</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#de2529] data-[state=active]:to-[#ff3b3f] data-[state=active]:text-white">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#de2529] data-[state=active]:to-[#ff3b3f] data-[state=active]:text-white">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Payments</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#de2529] data-[state=active]:to-[#ff3b3f] data-[state=active]:text-white">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#de2529] data-[state=active]:to-[#ff3b3f] data-[state=active]:text-white">
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
            <div className="card-dark">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                  <CreditCard className="h-6 w-6 text-[#de2529]" />
                  Payment Methods
                </h3>
                <p className="text-gray-400 mb-6">
                  Manage your saved payment methods
                </p>
                <div className="text-center py-12">
                  <CreditCard className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Payment method management coming soon...</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <AccountSettings 
              profileData={profileData}
              onUpdate={handleProfileUpdate}
            />
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <div className="card-dark">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                  <HeadphonesIcon className="h-6 w-6 text-[#de2529]" />
                  Customer Support
                </h3>
                <p className="text-gray-400 mb-6">
                  Get help with your orders and account
                </p>
                <div className="text-center py-12">
                  <HeadphonesIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Support system coming soon...</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}