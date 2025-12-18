'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { authAPI } from '@/lib/api'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    tenant_name: '',
    tenant_gstin: '',
    tenant_address: '',
    tenant_city: '',
    tenant_state: '',
    tenant_pincode: '',
    tenant_phone: '',
    tenant_email: '',
    username: '',
    password: '',
    full_name: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Normalize optional values before sending to the API
      const payload = {
        ...formData,
        tenant_name: formData.tenant_name.trim(),
        tenant_gstin: formData.tenant_gstin.trim() || undefined, // omit when blank (avoids backend UNIQUE constraint on "")
        tenant_address: formData.tenant_address.trim(),
        tenant_city: formData.tenant_city.trim(),
        tenant_state: formData.tenant_state.trim(),
        tenant_pincode: formData.tenant_pincode.trim(),
        tenant_phone: formData.tenant_phone.trim(),
        tenant_email: formData.tenant_email.trim(),
        username: formData.username.trim(),
        full_name: formData.full_name.trim(),
      }

      const res = await authAPI.register(payload)
      const tenantId = res?.user?.tenant_id
      const username = payload.username
      const qp = new URLSearchParams()
      qp.set('registered', 'true')
      if (tenantId) qp.set('tenant_id', String(tenantId))
      if (username) qp.set('username', username)
      router.push(`/login?${qp.toString()}`)
    } catch (err: any) {
      const detail = err?.response?.data?.detail
      const message =
        typeof detail === 'string'
          ? detail
          : Array.isArray(detail)
            ? detail.map((d: any) => d?.msg || JSON.stringify(d)).join(', ')
            : 'Registration failed'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="backdrop-blur-md bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors">
              <span>←</span>
              <span>Back to Home</span>
            </Link>
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-8 h-8">
                <Image
                  src="/logo.png"
                  alt="Billinator Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className="text-white text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Billinator
              </h1>
            </Link>
            <div className="w-24"></div>
          </div>
        </div>
      </nav>

      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-12 px-4">
        <div className="w-full max-w-2xl">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-xl p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Create Your Account
            </h2>
            <p className="text-gray-300 mb-6">Register your business and start managing your billing</p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white/5 border border-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-white">Business Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      name="tenant_name"
                      value={formData.tenant_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      GSTIN (optional)
                    </label>
                    <input
                      type="text"
                      name="tenant_gstin"
                      value={formData.tenant_gstin}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Address *
                    </label>
                    <textarea
                      name="tenant_address"
                      value={formData.tenant_address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">City *</label>
                      <input
                        type="text"
                        name="tenant_city"
                        value={formData.tenant_city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">State *</label>
                      <input
                        type="text"
                        name="tenant_state"
                        value={formData.tenant_state}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Pincode *</label>
                      <input
                        type="text"
                        name="tenant_pincode"
                        value={formData.tenant_pincode}
                        onChange={handleChange}
                        required
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Phone *</label>
                      <input
                        type="text"
                        name="tenant_phone"
                        value={formData.tenant_phone}
                        onChange={handleChange}
                        required
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="tenant_email"
                      value={formData.tenant_email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-white">Admin User Account</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Username *
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Password *
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>

              <div className="text-center">
                <p className="text-gray-300">
                  Already have an account?{' '}
                  <Link href="/login" className="text-purple-400 font-medium hover:text-purple-300 transition-colors">
                    Login Here
                  </Link>
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <p className="text-xs text-gray-500">
                  Free to use until 2027 • Developed by{' '}
                  <a href="https://medhalabs.in/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
                    Medhā Labs
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

