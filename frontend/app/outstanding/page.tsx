'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import Layout from '@/components/Layout'
import { formatCurrency } from '@/lib/utils'
import api from '@/lib/api'

export default function OutstandingPage() {
  const router = useRouter()
  const [outstanding, setOutstanding] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      router.push('/login')
      return
    }
    loadOutstanding()
  }, [router])

  const loadOutstanding = async () => {
    try {
      setLoading(true)
      const response = await api.get('/api/outstanding/')
      setOutstanding(response.data)
    } catch (error) {
      console.error('Failed to load outstanding:', error)
    } finally {
      setLoading(false)
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Outstanding</h1>
            <p className="text-gray-600">View receivables and payables</p>
          </div>
          <button
            onClick={loadOutstanding}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            🔄 Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Receivables (Customers)</h2>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {formatCurrency(outstanding?.total_receivables || 0)}
            </div>
            <p className="text-sm text-gray-500">Amount to be received from customers</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Payables (Suppliers)</h2>
            <div className="text-3xl font-bold text-red-600 mb-2">
              {formatCurrency(outstanding?.total_payables || 0)}
            </div>
            <p className="text-sm text-gray-500">Amount to be paid to suppliers</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <h3 className="px-6 py-4 bg-gray-50 text-lg font-semibold text-gray-800 border-b border-gray-200">
              Customer Outstanding
            </h3>
            <div className="max-h-96 overflow-y-auto">
              {outstanding?.receivables && outstanding.receivables.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {outstanding.receivables.map((item: any) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                          {formatCurrency(item.outstanding_balance || 0)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="px-6 py-4 text-center text-gray-500">No receivables</div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <h3 className="px-6 py-4 bg-gray-50 text-lg font-semibold text-gray-800 border-b border-gray-200">
              Supplier Outstanding
            </h3>
            <div className="max-h-96 overflow-y-auto">
              {outstanding?.payables && outstanding.payables.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {outstanding.payables.map((item: any) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                          {formatCurrency(item.outstanding_balance || 0)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="px-6 py-4 text-center text-gray-500">No payables</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

