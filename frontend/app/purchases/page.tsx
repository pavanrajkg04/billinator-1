'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import Layout from '@/components/Layout'
import { formatCurrency, formatDate } from '@/lib/utils'
import api from '@/lib/api'
import PurchaseInvoiceForm from '@/components/PurchaseInvoiceForm'
import Link from 'next/link'

export default function PurchasesPage() {
  const router = useRouter()
  const [purchases, setPurchases] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      router.push('/login')
      return
    }
    loadPurchases()
  }, [router])

  const loadPurchases = async () => {
    try {
      setLoading(true)
      const response = await api.get('/api/purchases/')
      setPurchases(response.data.invoices || [])
    } catch (error) {
      console.error('Failed to load purchases:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    loadPurchases()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this purchase invoice?')) return
    try {
      await api.delete(`/api/purchases/${id}`)
      loadPurchases()
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to delete purchase invoice')
    }
  }

  const filteredPurchases = purchases.filter((purchase) =>
    purchase.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (purchase.supplier_name && purchase.supplier_name.toLowerCase().includes(searchTerm.toLowerCase()))
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Purchases</h1>
            <p className="text-gray-600">Manage your purchase invoices</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            + New Purchase
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by invoice number or supplier..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paid</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPurchases.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    {searchTerm ? 'No purchase invoices match your search' : 'No purchase invoices found'}
                  </td>
                </tr>
              ) : (
                filteredPurchases.map((purchase) => (
                  <tr key={purchase.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Link
                        href={`/purchases/${purchase.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        {purchase.invoice_number}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {purchase.invoice_date ? formatDate(purchase.invoice_date) : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {purchase.supplier_name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(purchase.total_amount || 0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(purchase.paid_amount || 0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        purchase.status === 'PAID' ? 'bg-green-100 text-green-800' :
                        purchase.status === 'PARTIAL' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {purchase.status || 'PENDING'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleDelete(purchase.id)}
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
          <PurchaseInvoiceForm
            onSuccess={handleFormSuccess}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </Layout>
  )
}

