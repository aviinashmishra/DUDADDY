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
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
            <CardDescription>
              Manage your personal details and contact information
            </CardDescription>
          </div>
          {!isEditing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit
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
                Save
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="firstName" className="flex items-center gap-2">
                <User className="h-4 w-4" />
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
                <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-md">
                  {formData.firstName || 'Not provided'}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="lastName" className="flex items-center gap-2">
                <User className="h-4 w-4" />
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
                <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-md">
                  {formData.lastName || 'Not provided'}
                </p>
              )}
            </div>

            {/* Email (Read-only) */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <p className="text-gray-900 py-2 px-3 bg-gray-100 rounded-md">
                {profileData?.user?.email}
              </p>
              <p className="text-xs text-gray-500">
                Email cannot be changed. Contact support if needed.
              </p>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
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
                <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-md">
                  {formData.phone || 'Not provided'}
                </p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
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
                <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-md">
                  {formData.dateOfBirth ? 
                    new Date(formData.dateOfBirth).toLocaleDateString() : 
                    'Not provided'
                  }
                </p>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Bio
            </Label>
            {isEditing ? (
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell us about yourself..."
                rows={4}
                maxLength={500}
              />
            ) : (
              <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-md min-h-[100px]">
                {formData.bio || 'No bio provided'}
              </p>
            )}
            {isEditing && (
              <p className="text-xs text-gray-500">
                {formData.bio.length}/500 characters
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Account Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>
            Your account details and membership information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium text-gray-700">Account Status</Label>
              <p className="text-gray-900 py-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Member Since</Label>
              <p className="text-gray-900 py-2">
                {new Date(profileData?.user?.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Email Verified</Label>
              <p className="text-gray-900 py-2">
                {profileData?.user?.emailVerified ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                )}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Account Type</Label>
              <p className="text-gray-900 py-2 capitalize">
                {profileData?.user?.role || 'User'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}