'use client'
import { useState } from 'react'
import { ArrowLeftIcon, SaveIcon, EyeIcon, ImageIcon, PlusIcon, XIcon, Leaf, InfoIcon } from 'lucide-react'
import Link from 'next/link'

export default function AddProduct() {
    const [formData, setFormData] = useState({
        name: '',
        sanskritName: '',
        category: '',
        description: '',
        shortDescription: '',
        price: '',
        originalPrice: '',
        stock: '',
        sku: '',
        weight: '',
        dimensions: '',
        ingredients: [],
        benefits: [],
        dosage: '',
        warnings: '',
        certifications: [],
        images: [],
        seoTitle: '',
        seoDescription: '',
        tags: [],
        status: 'draft'
    })

    const [currentIngredient, setCurrentIngredient] = useState({ name: '', amount: '', benefit: '' })
    const [currentBenefit, setCurrentBenefit] = useState('')
    const [currentTag, setCurrentTag] = useState('')
    const [previewMode, setPreviewMode] = useState(false)

    const categories = [
        'Strength & Power',
        'Energy & Stamina', 
        'Recovery & Repair',
        'Immunity & Health',
        'Weight Management',
        'Mental Wellness'
    ]

    const certificationOptions = [
        'AYUSH Certified',
        'GMP Approved',
        'Lab Tested',
        'Organic',
        'Non-GMO',
        'Vegan',
        'Gluten Free'
    ]

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const addIngredient = () => {
        if (currentIngredient.name && currentIngredient.amount && currentIngredient.benefit) {
            setFormData(prev => ({
                ...prev,
                ingredients: [...prev.ingredients, currentIngredient]
            }))
            setCurrentIngredient({ name: '', amount: '', benefit: '' })
        }
    }

    const removeIngredient = (index) => {
        setFormData(prev => ({
            ...prev,
            ingredients: prev.ingredients.filter((_, i) => i !== index)
        }))
    }

    const addBenefit = () => {
        if (currentBenefit.trim()) {
            setFormData(prev => ({
                ...prev,
                benefits: [...prev.benefits, currentBenefit.trim()]
            }))
            setCurrentBenefit('')
        }
    }

    const removeBenefit = (index) => {
        setFormData(prev => ({
            ...prev,
            benefits: prev.benefits.filter((_, i) => i !== index)
        }))
    }

    const addTag = () => {
        if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, currentTag.trim()]
            }))
            setCurrentTag('')
        }
    }

    const removeTag = (index) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter((_, i) => i !== index)
        }))
    }

    const toggleCertification = (cert) => {
        setFormData(prev => ({
            ...prev,
            certifications: prev.certifications.includes(cert)
                ? prev.certifications.filter(c => c !== cert)
                : [...prev.certifications, cert]
        }))
    }

    const handleSubmit = (status) => {
        const productData = {
            ...formData,
            status,
            createdAt: new Date().toISOString()
        }
        
        console.log('Product data:', productData)
        // Here you would typically send the data to your API
        
        // Redirect to products list
        // router.push('/admin/products')
    }

    return (
        <div className="bg-[#0A0E1A] min-h-screen text-white p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/products" className="p-2 text-gray-400 hover:text-white hover:bg-[#0F1420] rounded-lg transition-colors">
                        <ArrowLeftIcon className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">
                            Add New <span className="text-gradient">Product</span>
                        </h1>
                        <p className="text-gray-400">Create a new Du Daddy Ayurvedic supplement</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setPreviewMode(!previewMode)}
                        className="btn-secondary flex items-center gap-2"
                    >
                        <EyeIcon className="w-4 h-4" />
                        {previewMode ? 'Edit' : 'Preview'}
                    </button>
                    <button
                        onClick={() => handleSubmit('draft')}
                        className="btn-secondary flex items-center gap-2"
                    >
                        <SaveIcon className="w-4 h-4" />
                        Save Draft
                    </button>
                    <button
                        onClick={() => handleSubmit('active')}
                        className="btn-primary flex items-center gap-2"
                    >
                        <SaveIcon className="w-4 h-4" />
                        Publish Product
                    </button>
                </div>
            </div>

            {previewMode ? (
                /* Preview Mode */
                <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Product Images */}
                            <div>
                                <div className="w-full h-96 bg-gradient-to-br from-[#de2529]/20 to-green-600/20 rounded-xl flex items-center justify-center mb-4">
                                    <Leaf className="w-24 h-24 text-[#de2529]" />
                                </div>
                            </div>

                            {/* Product Details */}
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">{formData.name || 'Product Name'}</h1>
                                <p className="text-xl text-[#de2529] font-semibold mb-4">{formData.sanskritName || 'Sanskrit Name'}</p>
                                <p className="text-green-400 font-medium mb-6">{formData.category || 'Category'}</p>

                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-3xl font-bold text-[#de2529]">₹{formData.price || '0'}</span>
                                    {formData.originalPrice && (
                                        <span className="text-xl text-gray-500 line-through">₹{formData.originalPrice}</span>
                                    )}
                                </div>

                                <p className="text-gray-300 leading-relaxed mb-6">{formData.description || 'Product description will appear here...'}</p>

                                {formData.benefits.length > 0 && (
                                    <div className="mb-6">
                                        <h4 className="text-lg font-semibold text-white mb-3">Key Benefits:</h4>
                                        <ul className="space-y-2">
                                            {formData.benefits.map((benefit, i) => (
                                                <li key={i} className="flex items-center gap-2 text-gray-300">
                                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                                    {benefit}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {formData.certifications.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {formData.certifications.map((cert, i) => (
                                            <span key={i} className="text-xs bg-green-600/20 text-green-400 px-3 py-1 rounded-full">
                                                {cert}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {formData.ingredients.length > 0 && (
                            <div className="mt-12 bg-[#0A0E1A] border border-[#1A2332] rounded-xl p-6">
                                <h4 className="text-2xl font-bold text-white mb-6 text-center">Key Ingredients</h4>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {formData.ingredients.map((ingredient, i) => (
                                        <div key={i} className="text-center">
                                            <div className="w-16 h-16 bg-gradient-to-br from-[#de2529] to-[#ff3b3f] rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Leaf className="w-8 h-8 text-white" />
                                            </div>
                                            <h5 className="text-lg font-semibold text-white mb-1">{ingredient.name}</h5>
                                            <p className="text-[#de2529] font-semibold text-sm mb-2">{ingredient.amount}</p>
                                            <p className="text-gray-400 text-sm">{ingredient.benefit}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                /* Edit Mode */
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Basic Information */}
                        <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                            <h2 className="text-xl font-bold text-white mb-6">Basic Information</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Product Name *</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white placeholder-gray-400 focus:border-[#de2529] focus:outline-none"
                                        placeholder="Du Daddy Product Name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Sanskrit Name</label>
                                    <input
                                        type="text"
                                        value={formData.sanskritName}
                                        onChange={(e) => handleInputChange('sanskritName', e.target.value)}
                                        className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white placeholder-gray-400 focus:border-[#de2529] focus:outline-none"
                                        placeholder="Sanskrit name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Category *</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => handleInputChange('category', e.target.value)}
                                        className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">SKU</label>
                                    <input
                                        type="text"
                                        value={formData.sku}
                                        onChange={(e) => handleInputChange('sku', e.target.value)}
                                        className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white placeholder-gray-400 focus:border-[#de2529] focus:outline-none"
                                        placeholder="DD-001"
                                    />
                                </div>
                            </div>
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-400 mb-2">Short Description</label>
                                <input
                                    type="text"
                                    value={formData.shortDescription}
                                    onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                                    className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white placeholder-gray-400 focus:border-[#de2529] focus:outline-none"
                                    placeholder="Brief product description for listings"
                                />
                            </div>
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-400 mb-2">Full Description *</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white placeholder-gray-400 focus:border-[#de2529] focus:outline-none"
                                    placeholder="Detailed product description..."
                                    required
                                />
                            </div>
                        </div>

                        {/* Pricing & Inventory */}
                        <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                            <h2 className="text-xl font-bold text-white mb-6">Pricing & Inventory</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Price *</label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => handleInputChange('price', e.target.value)}
                                        className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white placeholder-gray-400 focus:border-[#de2529] focus:outline-none"
                                        placeholder="499"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Original Price</label>
                                    <input
                                        type="number"
                                        value={formData.originalPrice}
                                        onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                                        className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white placeholder-gray-400 focus:border-[#de2529] focus:outline-none"
                                        placeholder="699"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Stock Quantity *</label>
                                    <input
                                        type="number"
                                        value={formData.stock}
                                        onChange={(e) => handleInputChange('stock', e.target.value)}
                                        className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white placeholder-gray-400 focus:border-[#de2529] focus:outline-none"
                                        placeholder="100"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6 mt-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Weight (grams)</label>
                                    <input
                                        type="number"
                                        value={formData.weight}
                                        onChange={(e) => handleInputChange('weight', e.target.value)}
                                        className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white placeholder-gray-400 focus:border-[#de2529] focus:outline-none"
                                        placeholder="60"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Dimensions (L×W×H cm)</label>
                                    <input
                                        type="text"
                                        value={formData.dimensions}
                                        onChange={(e) => handleInputChange('dimensions', e.target.value)}
                                        className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white placeholder-gray-400 focus:border-[#de2529] focus:outline-none"
                                        placeholder="10×5×15"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Ingredients */}
                        <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                            <h2 className="text-xl font-bold text-white mb-6">Ingredients</h2>
                            <div className="grid md:grid-cols-3 gap-4 mb-4">
                                <input
                                    type="text"
                                    value={currentIngredient.name}
                                    onChange={(e) => setCurrentIngredient(prev => ({ ...prev, name: e.target.value }))}
                                    className="px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white placeholder-gray-400 focus:border-[#de2529] focus:outline-none"
                                    placeholder="Ingredient name"
                                />
                                <input
                                    type="text"
                                    value={currentIngredient.amount}
                                    onChange={(e) => setCurrentIngredient(prev => ({ ...prev, amount: e.target.value }))}
                                    className="px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white placeholder-gray-400 focus:border-[#de2529] focus:outline-none"
                                    placeholder="Amount (e.g., 600mg)"
                                />
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={currentIngredient.benefit}
                                        onChange={(e) => setCurrentIngredient(prev => ({ ...prev, benefit: e.target.value }))}
                                        className="flex-1 px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white placeholder-gray-400 focus:border-[#de2529] focus:outline-none"
                                        placeholder="Benefit"
                                    />
                                    <button
                                        onClick={addIngredient}
                                        className="px-4 py-2 bg-[#de2529] text-white rounded-lg hover:bg-[#ff3b3f] transition-colors"
                                    >
                                        <PlusIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                {formData.ingredients.map((ingredient, index) => (
                                    <div key={index} className="flex items-center justify-between bg-[#0A0E1A] border border-[#1A2332] rounded-lg p-3">
                                        <div>
                                            <span className="text-white font-medium">{ingredient.name}</span>
                                            <span className="text-[#de2529] ml-2">({ingredient.amount})</span>
                                            <p className="text-gray-400 text-sm">{ingredient.benefit}</p>
                                        </div>
                                        <button
                                            onClick={() => removeIngredient(index)}
                                            className="text-red-400 hover:text-red-300"
                                        >
                                            <XIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Benefits */}
                        <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                            <h2 className="text-xl font-bold text-white mb-6">Key Benefits</h2>
                            <div className="flex gap-2 mb-4">
                                <input
                                    type="text"
                                    value={currentBenefit}
                                    onChange={(e) => setCurrentBenefit(e.target.value)}
                                    className="flex-1 px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white placeholder-gray-400 focus:border-[#de2529] focus:outline-none"
                                    placeholder="Enter a key benefit"
                                    onKeyPress={(e) => e.key === 'Enter' && addBenefit()}
                                />
                                <button
                                    onClick={addBenefit}
                                    className="px-4 py-2 bg-[#de2529] text-white rounded-lg hover:bg-[#ff3b3f] transition-colors"
                                >
                                    <PlusIcon className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="space-y-2">
                                {formData.benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-center justify-between bg-[#0A0E1A] border border-[#1A2332] rounded-lg p-3">
                                        <span className="text-white">{benefit}</span>
                                        <button
                                            onClick={() => removeBenefit(index)}
                                            className="text-red-400 hover:text-red-300"
                                        >
                                            <XIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Usage & Safety */}
                        <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                            <h2 className="text-xl font-bold text-white mb-6">Usage & Safety</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Dosage Instructions</label>
                                    <textarea
                                        value={formData.dosage}
                                        onChange={(e) => handleInputChange('dosage', e.target.value)}
                                        rows={2}
                                        className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white placeholder-gray-400 focus:border-[#de2529] focus:outline-none"
                                        placeholder="2 capsules daily with warm milk"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Warnings & Precautions</label>
                                    <textarea
                                        value={formData.warnings}
                                        onChange={(e) => handleInputChange('warnings', e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white placeholder-gray-400 focus:border-[#de2529] focus:outline-none"
                                        placeholder="Consult your doctor before use. Not recommended for pregnant women..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Product Images */}
                        <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                            <h2 className="text-xl font-bold text-white mb-6">Product Images</h2>
                            <div className="border-2 border-dashed border-[#1A2332] rounded-lg p-8 text-center">
                                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-400 mb-4">Drag & drop images here or click to browse</p>
                                <button className="btn-secondary">
                                    Choose Images
                                </button>
                            </div>
                        </div>

                        {/* Certifications */}
                        <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                            <h2 className="text-xl font-bold text-white mb-6">Certifications</h2>
                            <div className="space-y-3">
                                {certificationOptions.map(cert => (
                                    <label key={cert} className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.certifications.includes(cert)}
                                            onChange={() => toggleCertification(cert)}
                                            className="w-4 h-4 text-[#de2529] bg-[#0A0E1A] border-[#1A2332] rounded focus:ring-[#de2529] focus:ring-2"
                                        />
                                        <span className="text-white">{cert}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* SEO */}
                        <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                            <h2 className="text-xl font-bold text-white mb-6">SEO Settings</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">SEO Title</label>
                                    <input
                                        type="text"
                                        value={formData.seoTitle}
                                        onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                                        className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white placeholder-gray-400 focus:border-[#de2529] focus:outline-none"
                                        placeholder="SEO optimized title"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">SEO Description</label>
                                    <textarea
                                        value={formData.seoDescription}
                                        onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white placeholder-gray-400 focus:border-[#de2529] focus:outline-none"
                                        placeholder="SEO meta description"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                            <h2 className="text-xl font-bold text-white mb-6">Tags</h2>
                            <div className="flex gap-2 mb-4">
                                <input
                                    type="text"
                                    value={currentTag}
                                    onChange={(e) => setCurrentTag(e.target.value)}
                                    className="flex-1 px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white placeholder-gray-400 focus:border-[#de2529] focus:outline-none"
                                    placeholder="Add tag"
                                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                                />
                                <button
                                    onClick={addTag}
                                    className="px-4 py-2 bg-[#de2529] text-white rounded-lg hover:bg-[#ff3b3f] transition-colors"
                                >
                                    <PlusIcon className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.tags.map((tag, index) => (
                                    <span key={index} className="flex items-center gap-1 bg-[#0A0E1A] border border-[#1A2332] text-white px-3 py-1 rounded-full text-sm">
                                        {tag}
                                        <button
                                            onClick={() => removeTag(index)}
                                            className="text-red-400 hover:text-red-300"
                                        >
                                            <XIcon className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Status */}
                        <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                            <h2 className="text-xl font-bold text-white mb-6">Product Status</h2>
                            <select
                                value={formData.status}
                                onChange={(e) => handleInputChange('status', e.target.value)}
                                className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none"
                            >
                                <option value="draft">Draft</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                <div className="flex items-start gap-2">
                                    <InfoIcon className="w-4 h-4 text-blue-400 mt-0.5" />
                                    <div>
                                        <p className="text-blue-400 text-sm font-medium">Status Info</p>
                                        <p className="text-gray-400 text-xs mt-1">
                                            Draft products are not visible to customers. Active products will be shown in the store.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}