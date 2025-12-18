'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { quotesAPI } from '@/lib/api'
import Cookies from 'js-cookie'
import Layout from '@/components/Layout'
import { formatCurrency, formatDate } from '@/lib/utils'
import QuoteForm from '@/components/QuoteForm'
import api from '@/lib/api'
import Link from 'next/link'

const STATUS_COLORS: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-800',
  SENT: 'bg-blue-100 text-blue-800',
  ACCEPTED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
  EXPIRED: 'bg-yellow-100 text-yellow-800',
}

export default function QuotesPage() {
  const router = useRouter()
  const [quotes, setQuotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingQuote, setEditingQuote] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      router.push('/login')
      return
    }
    loadQuotes()
  }, [router, selectedStatus])

  const loadQuotes = async () => {
    try {
      setLoading(true)
      const filters: any = {}
      if (selectedStatus) filters.status = selectedStatus
      
      const data = await quotesAPI.list(filters)
      setQuotes(data.quotes || [])
    } catch (error) {
      console.error('Failed to load quotes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingQuote(null)
    loadQuotes()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this quote?')) return
    try {
      await quotesAPI.delete(id)
      loadQuotes()
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to delete quote')
    }
  }

  const handleConvert = async (id: number) => {
    if (!confirm('Convert this quote to an invoice?')) return
    try {
      await quotesAPI.convertToInvoice(id)
      alert('Quote converted to invoice successfully!')
      loadQuotes()
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to convert quote')
    }
  }

  const filteredQuotes = quotes.filter((quote) =>
    quote.quote_number.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Quotes & Estimates</h1>
            <p className="text-gray-600">Manage your quotes and convert them to invoices</p>
          </div>
          <button
            onClick={() => {
              setEditingQuote(null)
              setShowForm(true)
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            + New Quote
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search quotes by number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedStatus(null)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedStatus === null
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {Object.keys(STATUS_COLORS).map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedStatus === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Quotes List */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quote Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valid Until</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    {searchTerm ? 'No quotes match your search' : 'No quotes found'}
                  </td>
                </tr>
              ) : (
                filteredQuotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      <Link
                        href={`/quotes/${quote.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        {quote.quote_number}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {quote.customer_id ? `Customer #${quote.customer_id}` : 'No customer'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(quote.quote_date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {quote.valid_until ? formatDate(quote.valid_until) : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(quote.total_amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${STATUS_COLORS[quote.status] || 'bg-gray-100 text-gray-800'}`}>
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setEditingQuote(quote)
                          setShowForm(true)
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      {quote.status === 'ACCEPTED' && (
                        <button
                          onClick={() => handleConvert(quote.id)}
                          className="text-green-600 hover:text-green-900 mr-3"
                        >
                          Convert
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(quote.id)}
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
          <QuoteForm
            quote={editingQuote}
            onSuccess={handleFormSuccess}
            onCancel={() => {
              setShowForm(false)
              setEditingQuote(null)
            }}
          />
        )}
      </div>
    </Layout>
  )
}

