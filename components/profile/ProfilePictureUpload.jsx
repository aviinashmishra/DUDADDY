'use client'

import { useState, useRef } from 'react'
import { Camera, Upload, X, User, ImageIcon, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'

export default function ProfilePictureUpload({ currentImage, onImageUpdate }) {
  const [uploading, setUploading] = useState(false)
  const [previewImage, setPreviewImage] = useState(currentImage)
  const [showOptions, setShowOptions] = useState(false)
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
      setShowOptions(false)
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
    setShowOptions(false)
    
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
    setShowOptions(false)
  }

  return (
    <div className="relative">
      {/* Profile Picture Display */}
      <div className="relative group">
        <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden bg-[#1A2332] border-4 border-[#de2529] shadow-2xl shadow-red-500/20">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1A2332] to-[#0F1420]">
              <User className="w-12 h-12 lg:w-16 lg:h-16 text-gray-500" />
            </div>
          )}
          
          {/* Upload Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
               onClick={() => setShowOptions(!showOptions)}>
            <div className="text-center">
              <Camera className="w-8 h-8 text-white mx-auto mb-2" />
              <p className="text-white text-sm font-medium">Change Photo</p>
            </div>
          </div>

          {/* Loading Overlay */}
          {uploading && (
            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#de2529] mx-auto mb-2"></div>
                <p className="text-white text-sm">Uploading...</p>
              </div>
            </div>
          )}
        </div>

        {/* Camera Icon Button */}
        <button
          onClick={() => setShowOptions(!showOptions)}
          disabled={uploading}
          className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#de2529] to-[#ff3b3f] hover:shadow-lg hover:shadow-red-500/50 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Camera className="w-5 h-5" />
        </button>
      </div>

      {/* Options Menu */}
      {showOptions && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowOptions(false)}
          ></div>
          
          {/* Options Panel */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 z-50 bg-[#0F1420] border border-[#1A2332] rounded-xl shadow-2xl shadow-black/50 p-2 min-w-[200px]">
            <div className="space-y-1">
              <button
                onClick={triggerFileInput}
                disabled={uploading}
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-300 hover:bg-[#1A2332] hover:text-white rounded-lg transition-all duration-200 disabled:opacity-50"
              >
                <Upload className="w-5 h-5 text-[#de2529]" />
                <div>
                  <p className="font-medium">Upload Photo</p>
                  <p className="text-xs text-gray-500">Choose from device</p>
                </div>
              </button>
              
              {previewImage && !previewImage.includes('ui-avatars.com') && (
                <button
                  onClick={removeProfilePicture}
                  disabled={uploading}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-300 hover:bg-[#1A2332] hover:text-red-400 rounded-lg transition-all duration-200 disabled:opacity-50"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="font-medium">Remove Photo</p>
                    <p className="text-xs text-gray-500">Use default avatar</p>
                  </div>
                </button>
              )}
            </div>
            
            {/* Upload Guidelines */}
            <div className="border-t border-[#1A2332] mt-2 pt-2 px-2">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <ImageIcon className="w-3 h-3" />
                <span>Max 5MB • JPG, PNG, WebP</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  )
}