'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Settings, Bell, Shield, Globe, Save } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function AccountSettings({ profileData, onUpdate }) {
  const [saving, setSaving] = useState(false)
  const [preferences, setPreferences] = useState({
    emailNotifications: profileData?.preferences?.emailNotifications ?? true,
    smsNotifications: profileData?.preferences?.smsNotifications ?? false,
    marketingEmails: profileData?.preferences?.marketingEmails ?? true,
    orderUpdates: profileData?.preferences?.orderUpdates ?? true,
    promotionalOffers: profileData?.preferences?.promotionalOffers ?? true,
    dataSharing: profileData?.preferences?.dataSharing ?? false,
    twoFactorEnabled: profileData?.preferences?.twoFactorEnabled ?? false,
    language: profileData?.preferences?.language ?? 'en',
    currency: profileData?.preferences?.currency ?? 'INR',
    timezone: profileData?.preferences?.timezone ?? 'Asia/Kolkata',
  })

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          preferences
        }),
      })

      const data = await response.json()

      if (response.ok) {
        onUpdate(data)
        toast.success('Settings updated successfully!')
      } else {
        toast.error(data.error || 'Failed to update settings')
      }
    } catch (error) {
      console.error('Save error:', error)
      toast.error('Failed to update settings')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Choose how you want to be notified about your orders and account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <p className="text-sm text-gray-500">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                id="emailNotifications"
                checked={preferences.emailNotifications}
                onCheckedChange={(checked) => handlePreferenceChange('emailNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="smsNotifications">SMS Notifications</Label>
                <p className="text-sm text-gray-500">
                  Receive notifications via SMS
                </p>
              </div>
              <Switch
                id="smsNotifications"
                checked={preferences.smsNotifications}
                onCheckedChange={(checked) => handlePreferenceChange('smsNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="orderUpdates">Order Updates</Label>
                <p className="text-sm text-gray-500">
                  Get notified about order status changes
                </p>
              </div>
              <Switch
                id="orderUpdates"
                checked={preferences.orderUpdates}
                onCheckedChange={(checked) => handlePreferenceChange('orderUpdates', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketingEmails">Marketing Emails</Label>
                <p className="text-sm text-gray-500">
                  Receive promotional emails and newsletters
                </p>
              </div>
              <Switch
                id="marketingEmails"
                checked={preferences.marketingEmails}
                onCheckedChange={(checked) => handlePreferenceChange('marketingEmails', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="promotionalOffers">Promotional Offers</Label>
                <p className="text-sm text-gray-500">
                  Get notified about special deals and discounts
                </p>
              </div>
              <Switch
                id="promotionalOffers"
                checked={preferences.promotionalOffers}
                onCheckedChange={(checked) => handlePreferenceChange('promotionalOffers', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy & Security
          </CardTitle>
          <CardDescription>
            Manage your privacy settings and account security
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dataSharing">Data Sharing</Label>
                <p className="text-sm text-gray-500">
                  Allow sharing of anonymized data for analytics
                </p>
              </div>
              <Switch
                id="dataSharing"
                checked={preferences.dataSharing}
                onCheckedChange={(checked) => handlePreferenceChange('dataSharing', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="twoFactorEnabled">Two-Factor Authentication</Label>
                <p className="text-sm text-gray-500">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch
                id="twoFactorEnabled"
                checked={preferences.twoFactorEnabled}
                onCheckedChange={(checked) => handlePreferenceChange('twoFactorEnabled', checked)}
              />
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button variant="outline" className="w-full">
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Regional Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Regional Settings
          </CardTitle>
          <CardDescription>
            Set your language, currency, and timezone preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <select
                id="language"
                value={preferences.language}
                onChange={(e) => handlePreferenceChange('language', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <select
                id="currency"
                value={preferences.currency}
                onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="INR">Indian Rupee (₹)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
                <option value="GBP">British Pound (£)</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <select
                id="timezone"
                value={preferences.timezone}
                onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="Asia/Kolkata">Asia/Kolkata</option>
                <option value="America/New_York">America/New_York</option>
                <option value="Europe/London">Europe/London</option>
                <option value="Asia/Tokyo">Asia/Tokyo</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2"
        >
          {saving ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save Settings
        </Button>
      </div>
    </div>
  )
}