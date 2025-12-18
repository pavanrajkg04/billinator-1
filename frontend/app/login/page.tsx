'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { authAPI } from '@/lib/api'
import Cookies from 'js-cookie'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [tenantId, setTenantId] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const qpTenant = searchParams.get('tenant_id')
    const qpUsername = searchParams.get('username')
    if (qpTenant) setTenantId(qpTenant)
    if (qpUsername) setUsername(qpUsername)
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authAPI.login(
        username,
        password,
        tenantId ? parseInt(tenantId) : undefined
      )
      
      Cookies.set('token', response.access_token, { expires: 7 })
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed')
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
        <div className="w-full max-w-md">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-gray-300 mb-6">Sign in to your Billinator account</p>

            {searchParams.get('registered') === 'true' && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded mb-4">
                Registration successful. {tenantId ? <>Your Tenant ID is <strong>{tenantId}</strong>.</> : null}
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Tenant ID (optional)
                </label>
                <input
                  type="text"
                  value={tenantId}
                  onChange={(e) => setTenantId(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Username or Email
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-300">
                Don't have an account?{' '}
                <Link href="/register" className="text-purple-400 font-medium hover:text-purple-300 transition-colors">
                  Register Now
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
          </div>
        </div>
      </div>
    </div>
  )
}

