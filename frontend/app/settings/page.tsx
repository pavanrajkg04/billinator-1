'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import Layout from '@/components/Layout'
import api from '@/lib/api'

interface SettingsData {
  sales_invoice_prefix: string
  sales_invoice_start_number: number
  purchase_invoice_prefix: string
  purchase_invoice_start_number: number
  terms_conditions: string
  footer_text: string
}

export default function SettingsPage() {
  const router = useRouter()
  const [settings, setSettings] = useState<SettingsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      router.push('/login')
      return
    }
    loadSettings()
  }, [router])

  const loadSettings = async () => {
    try {
      setLoading(true)
      const response = await api.get('/api/settings/')
      setSettings(response.data)
    } catch (error) {
      console.error('Failed to load settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!settings) return
    
    setSaving(true)
    setMessage('')
    
    try {
      await api.put('/api/settings/', settings)
      setMessage('Settings saved successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error: any) {
      setMessage(error.response?.data?.detail || 'Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (field: keyof SettingsData, value: any) => {
    if (settings) {
      setSettings({ ...settings, [field]: value })
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Configure your application settings</p>
        </div>

        {message && (
          <div className={`mb-6 px-4 py-3 rounded-md ${
            message.includes('success') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Invoice Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sales Invoice Prefix
                </label>
                <input
                  type="text"
                  value={settings?.sales_invoice_prefix || 'INV'}
                  onChange={(e) => handleChange('sales_invoice_prefix', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Purchase Invoice Prefix
                </label>
                <input
                  type="text"
                  value={settings?.purchase_invoice_prefix || 'PINV'}
                  onChange={(e) => handleChange('purchase_invoice_prefix', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Company Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GSTIN
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Terms & Conditions</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Invoice Terms
              </label>
              <textarea
                rows={4}
                value={settings?.terms_conditions || ''}
                onChange={(e) => handleChange('terms_conditions', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter terms and conditions for invoices..."
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving || !settings}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

