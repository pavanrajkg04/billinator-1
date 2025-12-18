'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import Layout from '@/components/Layout'
import { formatCurrency, formatDate } from '@/lib/utils'
import api from '@/lib/api'
import SalesInvoiceForm from '@/components/SalesInvoiceForm'
import Link from 'next/link'

export default function SalesPage() {
  const router = useRouter()
  const [sales, setSales] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      router.push('/login')
      return
    }
    loadSales()
  }, [router])

  const loadSales = async () => {
    try {
      setLoading(true)
      const response = await api.get('/api/sales/')
      setSales(response.data.invoices || [])
    } catch (error) {
      console.error('Failed to load sales:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    loadSales()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this sales invoice?')) return
    try {
      await api.delete(`/api/sales/${id}`)
      loadSales()
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to delete sales invoice')
    }
  }

  const filteredSales = sales.filter((sale) =>
    sale.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (sale.customer_name && sale.customer_name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Sales</h1>
            <p className="text-gray-600">Manage your sales invoices</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            + New Sale
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by invoice number or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paid</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSales.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    {searchTerm ? 'No sales invoices match your search' : 'No sales invoices found'}
                  </td>
                </tr>
              ) : (
                filteredSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Link
                        href={`/sales/${sale.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        {sale.invoice_number}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sale.invoice_date ? formatDate(sale.invoice_date) : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sale.customer_name || 'Walk-in'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(sale.total_amount || 0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(sale.paid_amount || 0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        sale.status === 'PAID' ? 'bg-green-100 text-green-800' :
                        sale.status === 'PARTIAL' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {sale.status || 'PENDING'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleDelete(sale.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {showForm && (
          <SalesInvoiceForm
            onSuccess={handleFormSuccess}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </Layout>
  )
}

