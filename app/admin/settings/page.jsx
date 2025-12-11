'use client'
import { useState } from 'react'
import { SaveIcon, SettingsIcon, BellIcon, ShieldIcon, CreditCardIcon, TruckIcon, MailIcon, PhoneIcon, MapPinIcon, GlobeIcon, ImageIcon, ToggleLeftIcon, ToggleRightIcon } from 'lucide-react'

export default function AdminSettings() {
    const [activeTab, setActiveTab] = useState('general')
    const [settings, setSettings] = useState({
        general: {
            storeName: 'Du Daddy',
            storeDescription: 'India\'s #1 Ayurvedic Performance Brand',
            storeEmail: 'admin@dudaddy.com',
            storePhone: '+91 9876543210',
            storeAddress: '123 Ayurveda Street, Mumbai, Maharashtra 400001',
            currency: 'INR',
            timezone: 'Asia/Kolkata',
            language: 'en'
        },
        notifications: {
            emailNotifications: true,
            smsNotifications: true,
            orderNotifications: true,
            lowStockAlerts: true,
            customerSignups: true,
            reviewNotifications: true,
            marketingEmails: false
        },
        payment: {
            razorpayEnabled: true,
            razorpayKeyId: 'rzp_test_xxxxxxxxxx',
            razorpayKeySecret: '••••••••••••••••',
            paytmEnabled: false,
            paytmMerchantId: '',
            paytmMerchantKey: '',
            codEnabled: true,
            codCharges: 50,
            minOrderForFreeShipping: 500
        },
        shipping: {
            freeShippingThreshold: 500,
            standardShippingRate: 50,
            expressShippingRate: 100,
            internationalShipping: false,
            processingTime: '1-2 business days',
            shippingPartners: ['Delhivery', 'Blue Dart', 'DTDC']
        },
        seo: {
            metaTitle: 'Du Daddy - Ayurvedic Supplements | Har Gym Ka Daddy',
            metaDescription: 'India\'s #1 Ayurvedic performance supplement brand. 100% natural, zero side effects. Shop strength boosters, energy enhancers & recovery supplements.',
            metaKeywords: 'ayurvedic supplements, natural supplements, gym supplements, strength booster, energy enhancer',
            googleAnalyticsId: 'GA-XXXXXXXXX',
            facebookPixelId: '',
            googleTagManagerId: ''
        },
        security: {
            twoFactorAuth: false,
            sessionTimeout: 30,
            passwordPolicy: 'strong',
            loginAttempts: 5,
            ipWhitelist: [],
            sslEnabled: true
        }
    })

    const tabs = [
        { id: 'general', label: 'General', icon: SettingsIcon },
        { id: 'notifications', label: 'Notifications', icon: BellIcon },
        { id: 'payment', label: 'Payment', icon: CreditCardIcon },
        { id: 'shipping', label: 'Shipping', icon: TruckIcon },
        { id: 'seo', label: 'SEO', icon: GlobeIcon },
        { id: 'security', label: 'Security', icon: ShieldIcon }
    ]

    const updateSetting = (category, field, value) => {
        setSettings(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [field]: value
            }
        }))
    }

    const toggleSetting = (category, field) => {
        setSettings(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [field]: !prev[category][field]
            }
        }))
    }

    const saveSettings = () => {
        console.log('Saving settings:', settings)
        // Here you would typically send the settings to your API
    }

    return (
        <div className="bg-[#0A0E1A] min-h-screen text-white p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        Store <span className="text-gradient">Settings</span>
                    </h1>
                    <p className="text-gray-400">Configure your Du Daddy store settings and preferences</p>
                </div>
                <button
                    onClick={saveSettings}
                    className="btn-primary flex items-center gap-2"
                >
                    <SaveIcon className="w-4 h-4" />
                    Save Changes
                </button>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-1">
                    <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-4">
                        <nav className="space-y-2">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                                        activeTab === tab.id
                                            ? 'bg-[#de2529] text-white'
                                            : 'text-gray-400 hover:text-white hover:bg-[#0A0E1A]'
                                    }`}
                                >
                                    <tab.icon className="w-5 h-5" />
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Settings Content */}
                <div className="lg:col-span-3">
                    <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                        {/* General Settings */}
                        {activeTab === 'general' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white mb-6">General Settings</h2>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Store Name</label>
                                        <input
                                            type="text"
                                            value={settings.general.storeName}
                                            onChange={(e) => updateSetting('general', 'storeName', e.target.value)}
                                            className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Currency</label>
                                        <select
                                            value={settings.general.currency}
                                            onChange={(e) => updateSetting('general', 'currency', e.target.value)}
                                            className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none"
                                        >
                                            <option value="INR">Indian Rupee (₹)</option>
                                            <option value="USD">US Dollar ($)</option>
                                            <option value="EUR">Euro (€)</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Store Description</label>
                                    <textarea
                                        value={settings.general.storeDescription}
                                        onChange={(e) => updateSetting('general', 'storeDescription', e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Store Email</label>
                                        <div className="relative">
                                            <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                value={settings.general.storeEmail}
                                                onChange={(e) => updateSetting('general', 'storeEmail', e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Store Phone</label>
                                        <div className="relative">
                                            <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="tel"
                                                value={settings.general.storePhone}
                                                onChange={(e) => updateSetting('general', 'storePhone', e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Store Address</label>
                                    <div className="relative">
                                        <MapPinIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <textarea
                                            value={settings.general.storeAddress}
                                            onChange={(e) => updateSetting('general', 'storeAddress', e.target.value)}
                                            rows={2}
                                            className="w-full pl-10 pr-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Timezone</label>
                                        <select
                                            value={settings.general.timezone}
                                            onChange={(e) => updateSetting('general', 'timezone', e.target.value)}
                                            className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none"
                                        >
                                            <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                                            <option value="America/New_York">America/New_York (EST)</option>
                                            <option value="Europe/London">Europe/London (GMT)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Language</label>
                                        <select
                                            value={settings.general.language}
                                            onChange={(e) => updateSetting('general', 'language', e.target.value)}
                                            className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none"
                                        >
                                            <option value="en">English</option>
                                            <option value="hi">Hindi</option>
                                            <option value="mr">Marathi</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Notification Settings */}
                        {activeTab === 'notifications' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white mb-6">Notification Settings</h2>
                                
                                <div className="space-y-4">
                                    {Object.entries(settings.notifications).map(([key, value]) => (
                                        <div key={key} className="flex items-center justify-between p-4 bg-[#0A0E1A] border border-[#1A2332] rounded-lg">
                                            <div>
                                                <h3 className="text-white font-medium capitalize">
                                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                                </h3>
                                                <p className="text-gray-400 text-sm">
                                                    {key === 'emailNotifications' && 'Receive notifications via email'}
                                                    {key === 'smsNotifications' && 'Receive notifications via SMS'}
                                                    {key === 'orderNotifications' && 'Get notified about new orders'}
                                                    {key === 'lowStockAlerts' && 'Alert when products are low in stock'}
                                                    {key === 'customerSignups' && 'Notify when new customers register'}
                                                    {key === 'reviewNotifications' && 'Get notified about new reviews'}
                                                    {key === 'marketingEmails' && 'Receive marketing and promotional emails'}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => toggleSetting('notifications', key)}
                                                className="text-gray-400 hover:text-white"
                                            >
                                                {value ? 
                                                    <ToggleRightIcon className="w-8 h-8 text-green-400" /> : 
                                                    <ToggleLeftIcon className="w-8 h-8" />
                                                }
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Payment Settings */}
                        {activeTab === 'payment' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white mb-6">Payment Settings</h2>
                                
                                {/* Razorpay */}
                                <div className="bg-[#0A0E1A] border border-[#1A2332] rounded-lg p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-white">Razorpay</h3>
                                        <button
                                            onClick={() => toggleSetting('payment', 'razorpayEnabled')}
                                            className="text-gray-400 hover:text-white"
                                        >
                                            {settings.payment.razorpayEnabled ? 
                                                <ToggleRightIcon className="w-6 h-6 text-green-400" /> : 
                                                <ToggleLeftIcon className="w-6 h-6" />
                                            }
                                        </button>
                                    </div>
                                    {settings.payment.razorpayEnabled && (
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Key ID</label>
                                                <input
                                                    type="text"
                                                    value={settings.payment.razorpayKeyId}
                                                    onChange={(e) => updateSetting('payment', 'razorpayKeyId', e.target.value)}
                                                    className="w-full px-4 py-2 bg-[#0F1420] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Key Secret</label>
                                                <input
                                                    type="password"
                                                    value={settings.payment.razorpayKeySecret}
                                                    onChange={(e) => updateSetting('payment', 'razorpayKeySecret', e.target.value)}
                                                    className="w-full px-4 py-2 bg-[#0F1420] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Cash on Delivery */}
                                <div className="bg-[#0A0E1A] border border-[#1A2332] rounded-lg p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-white">Cash on Delivery</h3>
                                        <button
                                            onClick={() => toggleSetting('payment', 'codEnabled')}
                                            className="text-gray-400 hover:text-white"
                                        >
                                            {settings.payment.codEnabled ? 
                                                <ToggleRightIcon className="w-6 h-6 text-green-400" /> : 
                                                <ToggleLeftIcon className="w-6 h-6" />
                                            }
                                        </button>
                                    </div>
                                    {settings.payment.codEnabled && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">COD Charges (₹)</label>
                                            <input
                                                type="number"
                                                value={settings.payment.codCharges}
                                                onChange={(e) => updateSetting('payment', 'codCharges', parseInt(e.target.value))}
                                                className="w-full px-4 py-2 bg-[#0F1420] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Minimum Order for Free Shipping (₹)</label>
                                    <input
                                        type="number"
                                        value={settings.payment.minOrderForFreeShipping}
                                        onChange={(e) => updateSetting('payment', 'minOrderForFreeShipping', parseInt(e.target.value))}
                                        className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Shipping Settings */}
                        {activeTab === 'shipping' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white mb-6">Shipping Settings</h2>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Free Shipping Threshold (₹)</label>
                                        <input
                                            type="number"
                                            value={settings.shipping.freeShippingThreshold}
                                            onChange={(e) => updateSetting('shipping', 'freeShippingThreshold', parseInt(e.target.value))}
                                            className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Standard Shipping Rate (₹)</label>
                                        <input
                                            type="number"
                                            value={settings.shipping.standardShippingRate}
                                            onChange={(e) => updateSetting('shipping', 'standardShippingRate', parseInt(e.target.value))}
                                            className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Express Shipping Rate (₹)</label>
                                        <input
                                            type="number"
                                            value={settings.shipping.expressShippingRate}
                                            onChange={(e) => updateSetting('shipping', 'expressShippingRate', parseInt(e.target.value))}
                                            className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Processing Time</label>
                                        <input
                                            type="text"
                                            value={settings.shipping.processingTime}
                                            onChange={(e) => updateSetting('shipping', 'processingTime', e.target.value)}
                                            className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-[#0A0E1A] border border-[#1A2332] rounded-lg">
                                    <div>
                                        <h3 className="text-white font-medium">International Shipping</h3>
                                        <p className="text-gray-400 text-sm">Enable shipping to international destinations</p>
                                    </div>
                                    <button
                                        onClick={() => toggleSetting('shipping', 'internationalShipping')}
                                        className="text-gray-400 hover:text-white"
                                    >
                                        {settings.shipping.internationalShipping ? 
                                            <ToggleRightIcon className="w-6 h-6 text-green-400" /> : 
                                            <ToggleLeftIcon className="w-6 h-6" />
                                        }
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* SEO Settings */}
                        {activeTab === 'seo' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white mb-6">SEO Settings</h2>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Meta Title</label>
                                    <input
                                        type="text"
                                        value={settings.seo.metaTitle}
                                        onChange={(e) => updateSetting('seo', 'metaTitle', e.target.value)}
                                        className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Meta Description</label>
                                    <textarea
                                        value={settings.seo.metaDescription}
                                        onChange={(e) => updateSetting('seo', 'metaDescription', e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Meta Keywords</label>
                                    <input
                                        type="text"
                                        value={settings.seo.metaKeywords}
                                        onChange={(e) => updateSetting('seo', 'metaKeywords', e.target.value)}
                                        className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none"
                                        placeholder="keyword1, keyword2, keyword3"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Google Analytics ID</label>
                                        <input
                                            type="text"
                                            value={settings.seo.googleAnalyticsId}
                                            onChange={(e) => updateSetting('seo', 'googleAnalyticsId', e.target.value)}
                                            className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none"
                                            placeholder="GA-XXXXXXXXX"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Facebook Pixel ID</label>
                                        <input
                                            type="text"
                                            value={settings.seo.facebookPixelId}
                                            onChange={(e) => updateSetting('seo', 'facebookPixelId', e.target.value)}
                                            className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none"
                                            placeholder="Facebook Pixel ID"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Security Settings */}
                        {activeTab === 'security' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white mb-6">Security Settings</h2>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-[#0A0E1A] border border-[#1A2332] rounded-lg">
                                        <div>
                                            <h3 className="text-white font-medium">Two-Factor Authentication</h3>
                                            <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
                                        </div>
                                        <button
                                            onClick={() => toggleSetting('security', 'twoFactorAuth')}
                                            className="text-gray-400 hover:text-white"
                                        >
                                            {settings.security.twoFactorAuth ? 
                                                <ToggleRightIcon className="w-6 h-6 text-green-400" /> : 
                                                <ToggleLeftIcon className="w-6 h-6" />
                                            }
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-[#0A0E1A] border border-[#1A2332] rounded-lg">
                                        <div>
                                            <h3 className="text-white font-medium">SSL Enabled</h3>
                                            <p className="text-gray-400 text-sm">Secure your website with SSL encryption</p>
                                        </div>
                                        <button
                                            onClick={() => toggleSetting('security', 'sslEnabled')}
                                            className="text-gray-400 hover:text-white"
                                        >
                                            {settings.security.sslEnabled ? 
                                                <ToggleRightIcon className="w-6 h-6 text-green-400" /> : 
                                                <ToggleLeftIcon className="w-6 h-6" />
                                            }
                                        </button>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Session Timeout (minutes)</label>
                                        <input
                                            type="number"
                                            value={settings.security.sessionTimeout}
                                            onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                                            className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Max Login Attempts</label>
                                        <input
                                            type="number"
                                            value={settings.security.loginAttempts}
                                            onChange={(e) => updateSetting('security', 'loginAttempts', parseInt(e.target.value))}
                                            className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Password Policy</label>
                                    <select
                                        value={settings.security.passwordPolicy}
                                        onChange={(e) => updateSetting('security', 'passwordPolicy', e.target.value)}
                                        className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none"
                                    >
                                        <option value="weak">Weak (6+ characters)</option>
                                        <option value="medium">Medium (8+ characters, mixed case)</option>
                                        <option value="strong">Strong (12+ characters, mixed case, numbers, symbols)</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}