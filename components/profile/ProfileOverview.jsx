'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Edit, Save, X, User, Mail, Phone, Calendar, FileText } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function ProfileOverview({ profileData, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    firstName: profileData?.profile?.firstName || '',
    lastName: profileData?.profile?.lastName || '',
    phone: profileData?.profile?.phone || '',
    dateOfBirth: profileData?.profile?.dateOfBirth ? 
      new Date(profileData.profile.dateOfBirth).toISOString().split('T')[0] : '',
    bio: profileData?.profile?.bio || '',
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
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
          profile: formData
        }),
      })

      const data = await response.json()

      if (response.ok) {
        onUpdate(data)
        setIsEditing(false)
        toast.success('Profile updated successfully!')
      } else {
        toast.error(data.error || 'Failed to update profile')
      }
    } catch (error) {
      console.error('Save error:', error)
      toast.error('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      firstName: profileData?.profile?.firstName || '',
      lastName: profileData?.profile?.lastName || '',
      phone: profileData?.profile?.phone || '',
      dateOfBirth: profileData?.profile?.dateOfBirth ? 
        new Date(profileData.profile.dateOfBirth).toISOString().split('T')[0] : '',
      bio: profileData?.profile?.bio || '',
    })
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      {/* Personal Information Card */}
      <div className="card-dark">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6 border-b border-[#1A2332]">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <User className="h-6 w-6 text-[#de2529]" />
              Personal Information
            </h3>
            <p className="text-gray-400">
              Manage your personal details and contact information
            </p>
          </div>
          {!isEditing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 hover:border-[#de2529] hover:text-[#de2529]"
            >
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={saving}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2"
              >
                {saving ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save Changes
              </Button>
            </div>
          )}
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="firstName" className="flex items-center gap-2 text-gray-300">
                <User className="h-4 w-4 text-[#de2529]" />
                First Name
              </Label>
              {isEditing ? (
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter your first name"
                />
              ) : (
                <div className="text-white py-3 px-4 bg-[#1A2332] rounded-lg border border-[#2A3441]">
                  {formData.firstName || <span className="text-gray-500">Not provided</span>}
                </div>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="lastName" className="flex items-center gap-2 text-gray-300">
                <User className="h-4 w-4 text-[#de2529]" />
                Last Name
              </Label>
              {isEditing ? (
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter your last name"
                />
              ) : (
                <div className="text-white py-3 px-4 bg-[#1A2332] rounded-lg border border-[#2A3441]">
                  {formData.lastName || <span className="text-gray-500">Not provided</span>}
                </div>
              )}
            </div>

            {/* Email (Read-only) */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-300">
                <Mail className="h-4 w-4 text-[#de2529]" />
                Email Address
              </Label>
              <div className="text-white py-3 px-4 bg-[#2A3441] rounded-lg border border-[#3A4451] opacity-75">
                {profileData?.user?.email}
              </div>
              <p className="text-xs text-gray-500">
                Email cannot be changed. Contact support if needed.
              </p>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2 text-gray-300">
                <Phone className="h-4 w-4 text-[#de2529]" />
                Phone Number
              </Label>
              {isEditing ? (
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                />
              ) : (
                <div className="text-white py-3 px-4 bg-[#1A2332] rounded-lg border border-[#2A3441]">
                  {formData.phone || <span className="text-gray-500">Not provided</span>}
                </div>
              )}
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth" className="flex items-center gap-2 text-gray-300">
                <Calendar className="h-4 w-4 text-[#de2529]" />
                Date of Birth
              </Label>
              {isEditing ? (
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                />
              ) : (
                <div className="text-white py-3 px-4 bg-[#1A2332] rounded-lg border border-[#2A3441]">
                  {formData.dateOfBirth ? 
                    new Date(formData.dateOfBirth).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 
                    <span className="text-gray-500">Not provided</span>
                  }
                </div>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio" className="flex items-center gap-2 text-gray-300">
              <FileText className="h-4 w-4 text-[#de2529]" />
              Bio
            </Label>
            {isEditing ? (
              <div className="space-y-2">
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  maxLength={500}
                />
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">
                    {formData.bio.length}/500 characters
                  </p>
                  <div className={`text-xs ${formData.bio.length > 450 ? 'text-red-400' : 'text-gray-500'}`}>
                    {500 - formData.bio.length} remaining
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-white py-3 px-4 bg-[#1A2332] rounded-lg border border-[#2A3441] min-h-[100px]">
                {formData.bio || <span className="text-gray-500">No bio provided</span>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Account Information Card */}
      <div className="card-dark">
        <div className="p-6 border-b border-[#1A2332]">
          <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <Settings className="h-6 w-6 text-[#de2529]" />
            Account Information
          </h3>
          <p className="text-gray-400">
            Your account details and membership information
          </p>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-300">Account Status</Label>
              <div className="py-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Active
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-300">Member Since</Label>
              <div className="text-white py-2">
                {new Date(profileData?.user?.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-300">Email Verified</Label>
              <div className="py-2">
                {profileData?.user?.emailVerified ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                    Pending
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-300">Account Type</Label>
              <div className="py-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${
                  profileData?.user?.role === 'admin' 
                    ? 'bg-gradient-to-r from-[#de2529] to-[#ff3b3f] text-white' 
                    : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                }`}>
                  {profileData?.user?.role || 'User'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}