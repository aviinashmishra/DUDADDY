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
      <div className="card-dark">
        <div className="p-6 border-b border-[#1A2332]">
          <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <Bell className="h-6 w-6 text-[#de2529]" />
            Notification Preferences
          </h3>
          <p className="text-gray-400">
            Choose how you want to be notified about your orders and account
          </p>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-[#1A2332] rounded-lg border border-[#2A3441]">
              <div className="space-y-1">
                <Label htmlFor="emailNotifications" className="text-white font-medium">Email Notifications</Label>
                <p className="text-sm text-gray-400">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                id="emailNotifications"
                checked={preferences.emailNotifications}
                onCheckedChange={(checked) => handlePreferenceChange('emailNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-[#1A2332] rounded-lg border border-[#2A3441]">
              <div className="space-y-1">
                <Label htmlFor="smsNotifications" className="text-white font-medium">SMS Notifications</Label>
                <p className="text-sm text-gray-400">
                  Receive notifications via SMS
                </p>
              </div>
              <Switch
                id="smsNotifications"
                checked={preferences.smsNotifications}
                onCheckedChange={(checked) => handlePreferenceChange('smsNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-[#1A2332] rounded-lg border border-[#2A3441]">
              <div className="space-y-1">
                <Label htmlFor="orderUpdates" className="text-white font-medium">Order Updates</Label>
                <p className="text-sm text-gray-400">
                  Get notified about order status changes
                </p>
              </div>
              <Switch
                id="orderUpdates"
                checked={preferences.orderUpdates}
                onCheckedChange={(checked) => handlePreferenceChange('orderUpdates', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-[#1A2332] rounded-lg border border-[#2A3441]">
              <div className="space-y-1">
                <Label htmlFor="marketingEmails" className="text-white font-medium">Marketing Emails</Label>
                <p className="text-sm text-gray-400">
                  Receive promotional emails and newsletters
                </p>
              </div>
              <Switch
                id="marketingEmails"
                checked={preferences.marketingEmails}
                onCheckedChange={(checked) => handlePreferenceChange('marketingEmails', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-[#1A2332] rounded-lg border border-[#2A3441]">
              <div className="space-y-1">
                <Label htmlFor="promotionalOffers" className="text-white font-medium">Promotional Offers</Label>
                <p className="text-sm text-gray-400">
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
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="card-dark">
        <div className="p-6 border-b border-[#1A2332]">
          <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <Shield className="h-6 w-6 text-[#de2529]" />
            Privacy & Security
          </h3>
          <p className="text-gray-400">
            Manage your privacy settings and account security
          </p>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-[#1A2332] rounded-lg border border-[#2A3441]">
              <div className="space-y-1">
                <Label htmlFor="dataSharing" className="text-white font-medium">Data Sharing</Label>
                <p className="text-sm text-gray-400">
                  Allow sharing of anonymized data for analytics
                </p>
              </div>
              <Switch
                id="dataSharing"
                checked={preferences.dataSharing}
                onCheckedChange={(checked) => handlePreferenceChange('dataSharing', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-[#1A2332] rounded-lg border border-[#2A3441]">
              <div className="space-y-1">
                <Label htmlFor="twoFactorEnabled" className="text-white font-medium">Two-Factor Authentication</Label>
                <p className="text-sm text-gray-400">
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

          <div className="pt-6 border-t border-[#1A2332]">
            <Button variant="outline" className="w-full">
              Change Password
            </Button>
          </div>
        </div>
      </div>

      {/* Regional Settings */}
      <div className="card-dark">
        <div className="p-6 border-b border-[#1A2332]">
          <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <Globe className="h-6 w-6 text-[#de2529]" />
            Regional Settings
          </h3>
          <p className="text-gray-400">
            Set your language, currency, and timezone preferences
          </p>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="language" className="text-gray-300">Language</Label>
              <select
                id="language"
                value={preferences.language}
                onChange={(e) => handlePreferenceChange('language', e.target.value)}
                className="w-full px-3 py-2 border border-[#1A2332] bg-[#0F1420] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#de2529] focus:border-[#de2529] transition-all duration-200"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency" className="text-gray-300">Currency</Label>
              <select
                id="currency"
                value={preferences.currency}
                onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                className="w-full px-3 py-2 border border-[#1A2332] bg-[#0F1420] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#de2529] focus:border-[#de2529] transition-all duration-200"
              >
                <option value="INR">Indian Rupee (₹)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
                <option value="GBP">British Pound (£)</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone" className="text-gray-300">Timezone</Label>
              <select
                id="timezone"
                value={preferences.timezone}
                onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                className="w-full px-3 py-2 border border-[#1A2332] bg-[#0F1420] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#de2529] focus:border-[#de2529] transition-all duration-200"
              >
                <option value="Asia/Kolkata">Asia/Kolkata</option>
                <option value="America/New_York">America/New_York</option>
                <option value="Europe/London">Europe/London</option>
                <option value="Asia/Tokyo">Asia/Tokyo</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-3"
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