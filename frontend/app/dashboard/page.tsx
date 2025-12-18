'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { dashboardAPI, authAPI } from '@/lib/api'
import Cookies from 'js-cookie'
import Layout from '@/components/Layout'
import { formatCurrency, formatDate } from '@/lib/utils'

interface DashboardStats {
  total_sales: number
  total_purchases: number
  outstanding_receivables: number
  outstanding_payables: number
  low_stock_count: number
  total_customers: number
  total_suppliers: number
  total_products: number
  recent_sales: Array<{
    id: number
    invoice_number: string
    invoice_date: string
    total_amount: number
    status: string
    customer_name: string | null
  }>
  recent_purchases: Array<{
    id: number
    invoice_number: string
    invoice_date: string
    total_amount: number
    status: string
    supplier_name: string | null
  }>
  low_stock_items: Array<{
    id: number
    sku: string
    name: string
    current_stock: number
    reorder_level: number
    unit: string
  }>
}

interface StatCardProps {
  title: string
  value: string | number
  icon: string
  color: string
  bgGradient: string
}

function StatCard({ title, value, icon, color, bgGradient }: StatCardProps) {
  return (
    <div
      className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
      style={{ background: bgGradient }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        <span className="text-xs font-medium text-gray-600 bg-white/50 px-2 py-1 rounded">
          {title}
        </span>
      </div>
      <h3 className={`text-3xl font-bold ${color}`}>
        {typeof value === 'number' ? formatCurrency(value) : value}
      </h3>
    </div>
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      router.push('/login')
      return
    }

    loadUserInfo()
    loadDashboard()
  }, [router])

  const loadUserInfo = async () => {
    try {
      const response = await authAPI.me()
      setUsername(response.user?.username || '')
    } catch (error) {
      console.error('Failed to load user info:', error)
    }
  }

  const loadDashboard = async () => {
    try {
      setError('')
      const data = await dashboardAPI.getStats()
      setStats(data)
    } catch (err: any) {
      console.error('Failed to load dashboard:', err)
      setError(err.response?.data?.detail || 'Failed to load dashboard data')
      if (err.response?.status === 401) {
        router.push('/login')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    Cookies.remove('token')
    router.push('/login')
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout refreshCallback={loadDashboard}>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">
              Welcome back, {username || 'User'}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={loadDashboard}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              🔄 Refresh
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-red-700 bg-white border border-red-300 rounded-md hover:bg-red-50 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {stats && (
          <>
            {/* Key Metrics */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Sales"
                  value={stats.total_sales}
                  icon="📈"
                  color="text-green-600"
                  bgGradient="linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)"
                />
                <StatCard
                  title="Total Purchases"
                  value={stats.total_purchases}
                  icon="🛒"
                  color="text-blue-600"
                  bgGradient="linear-gradient(135deg, #cfe2ff 0%, #b6d4fe 100%)"
                />
                <StatCard
                  title="Outstanding (Receivables)"
                  value={stats.outstanding_receivables}
                  icon="⬆️"
                  color="text-orange-600"
                  bgGradient="linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)"
                />
                <StatCard
                  title="Outstanding (Payables)"
                  value={stats.outstanding_payables}
                  icon="⬇️"
                  color="text-red-600"
                  bgGradient="linear-gradient(135deg, #ffcccc 0%, #ff9999 100%)"
                />
              </div>
            </div>

            {/* Overview */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Customers"
                  value={stats.total_customers}
                  icon="👥"
                  color="text-purple-600"
                  bgGradient="linear-gradient(135deg, #e9d5ff 0%, #d8b4fe 100%)"
                />
                <StatCard
                  title="Suppliers"
                  value={stats.total_suppliers}
                  icon="🚚"
                  color="text-indigo-600"
                  bgGradient="linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%)"
                />
                <StatCard
                  title="Products"
                  value={stats.total_products}
                  icon="📦"
                  color="text-teal-600"
                  bgGradient="linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%)"
                />
                <StatCard
                  title="Low Stock Items"
                  value={stats.low_stock_count}
                  icon="⚠️"
                  color="text-red-600"
                  bgGradient="linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)"
                />
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Sales */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Sales</h3>
                  {stats.recent_sales && stats.recent_sales.length > 0 ? (
                    <div className="space-y-3">
                      {stats.recent_sales.map((sale) => (
                        <div
                          key={sale.id}
                          className="pb-3 border-b border-gray-200 last:border-b-0"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">
                                {sale.invoice_number}
                              </p>
                              <p className="text-sm text-gray-600">
                                {sale.customer_name || 'Walk-in'} • {formatDate(sale.invoice_date)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">
                                {formatCurrency(sale.total_amount)}
                              </p>
                              <span
                                className={`text-xs px-2 py-1 rounded ${
                                  sale.status === 'PAID'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {sale.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 py-4">No sales yet</p>
                  )}
                </div>

                {/* Recent Purchases */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Purchases</h3>
                  {stats.recent_purchases && stats.recent_purchases.length > 0 ? (
                    <div className="space-y-3">
                      {stats.recent_purchases.map((purchase) => (
                        <div
                          key={purchase.id}
                          className="pb-3 border-b border-gray-200 last:border-b-0"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">
                                {purchase.invoice_number}
                              </p>
                              <p className="text-sm text-gray-600">
                                {purchase.supplier_name || 'N/A'} • {formatDate(purchase.invoice_date)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">
                                {formatCurrency(purchase.total_amount)}
                              </p>
                              <span
                                className={`text-xs px-2 py-1 rounded ${
                                  purchase.status === 'PAID'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {purchase.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 py-4">No purchases yet</p>
                  )}
                </div>
              </div>
            </div>

            {/* Low Stock Alert */}
            {stats.low_stock_count > 0 && stats.low_stock_items && stats.low_stock_items.length > 0 && (
              <div className="mb-8">
                <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg border-2 border-red-200 p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-2xl">⚠️</span>
                    <h3 className="text-xl font-bold text-red-600">Low Stock Alert</h3>
                  </div>
                  <div className="space-y-2">
                    {stats.low_stock_items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white/80 rounded-md p-3 border border-red-200"
                      >
                        <p className="font-semibold text-red-800">
                          {item.name} ({item.sku})
                        </p>
                        <p className="text-sm text-red-600">
                          Stock: {item.current_stock.toFixed(2)} {item.unit} (Reorder Level: {item.reorder_level} {item.unit})
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  )
}

