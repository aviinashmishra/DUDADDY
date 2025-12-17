'use client'

import { useState, useRef } from 'react'
import { Camera, Upload, X, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'

export default function ProfilePictureUpload({ currentImage, onImageUpdate }) {
  const [uploading, setUploading] = useState(false)
  const [previewImage, setPreviewImage] = useState(currentImage)
  const fileInputRef = useRef(null)

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      if (!allowedTypes.includes(file.type)) {
        toast.error('Invalid file type. Only JPEG, PNG, and WebP are allowed.')
        return
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (file.size > maxSize) {
        toast.error('File size too large. Maximum 5MB allowed.')
        return
      }

      // Show preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewImage(e.target.result)
      }
      reader.readAsDataURL(file)

      // Upload file
      uploadProfilePicture(file)
    }
  }

  const uploadProfilePicture = async (file) => {
    setUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('profilePicture', file)

      const response = await fetch('/api/profile/picture', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setPreviewImage(data.profilePicture)
        onImageUpdate({ profilePicture: data.profilePicture })
        toast.success('Profile picture updated successfully!')
      } else {
        toast.error(data.error || 'Failed to upload profile picture')
        setPreviewImage(currentImage) // Reset preview on error
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload profile picture')
      setPreviewImage(currentImage) // Reset preview on error
    } finally {
      setUploading(false)
    }
  }

  const removeProfilePicture = async () => {
    setUploading(true)
    
    try {
      const response = await fetch('/api/profile/picture', {
        method: 'DELETE',
      })

      const data = await response.json()

      if (response.ok) {
        setPreviewImage(data.defaultAvatar)
        onImageUpdate({ profilePicture: null, defaultAvatar: data.defaultAvatar })
        toast.success('Profile picture removed successfully!')
      } else {
        toast.error(data.error || 'Failed to remove profile picture')
      }
    } catch (error) {
      console.error('Remove error:', error)
      toast.error('Failed to remove profile picture')
    } finally {
      setUploading(false)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="relative group">
      {/* Profile Picture Display */}
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
        {previewImage ? (
          <img
            src={previewImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <User className="w-8 h-8 sm:w-12 sm:h-12 text-gray-500" />
          </div>
        )}
        
        {/* Upload Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Camera className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Upload Button */}
      <button
        onClick={triggerFileInput}
        disabled={uploading}
        className="absolute -bottom-2 -right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {uploading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        ) : (
          <Upload className="w-4 h-4" />
        )}
      </button>

      {/* Remove Button (only show if there's a custom image) */}
      {previewImage && !previewImage.includes('ui-avatars.com') && (
        <button
          onClick={removeProfilePicture}
          disabled={uploading}
          className="absolute -top-2 -right-2 bg-gray-600 hover:bg-gray-700 text-white p-1 rounded-full shadow-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <X className="w-3 h-3" />
        </button>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Upload Instructions */}
      <div className="mt-2 text-center">
        <p className="text-xs text-gray-500">
          Click to upload
        </p>
        <p className="text-xs text-gray-400">
          Max 5MB • JPG, PNG, WebP
        </p>
      </div>
    </div>
  )
}