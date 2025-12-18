'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { quotesAPI } from '@/lib/api'
import Cookies from 'js-cookie'
import Layout from '@/components/Layout'
import { formatCurrency, formatDate } from '@/lib/utils'
import Link from 'next/link'

export default function QuoteDetailPage() {
  const router = useRouter()
  const params = useParams()
  const quoteId = parseInt(params.id as string)
  
  const [quote, setQuote] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      router.push('/login')
      return
    }
    loadQuote()
  }, [router, quoteId])

  const loadQuote = async () => {
    try {
      setLoading(true)
      const data = await quotesAPI.get(quoteId)
      setQuote(data.quote)
    } catch (error) {
      console.error('Failed to load quote:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleConvert = async () => {
    if (!confirm('Convert this quote to an invoice?')) return
    try {
      await quotesAPI.convertToInvoice(quoteId)
      alert('Quote converted to invoice successfully!')
      router.push('/sales')
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to convert quote')
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

  if (!quote) {
    return (
      <Layout>
        <div className="p-8">
          <div className="text-center text-gray-500">Quote not found</div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/quotes" className="text-blue-600 hover:text-blue-900">
            ← Back to Quotes
          </Link>
          <div className="flex space-x-3">
            {quote.status === 'ACCEPTED' && (
              <button
                onClick={handleConvert}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Convert to Invoice
              </button>
            )}
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              🖨️ Print
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-4xl mx-auto">
          {/* Quote Header */}
          <div className="border-b border-gray-200 pb-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Quote / Estimate</h1>
                <p className="text-gray-600">Quote #: {quote.quote_number}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Date: {formatDate(quote.quote_date)}</p>
                {quote.valid_until && (
                  <p className="text-sm text-gray-600">Valid Until: {formatDate(quote.valid_until)}</p>
                )}
                <span className={`mt-2 inline-block px-3 py-1 text-xs font-medium rounded-full ${
                  quote.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                  quote.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                  quote.status === 'SENT' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {quote.status}
                </span>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Quantity</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Tax %</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {quote.items && quote.items.map((item: any, index: number) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm text-gray-900">{item.description}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 text-right">{item.quantity}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 text-right">{formatCurrency(item.unit_price)}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 text-right">{item.tax_rate}%</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">{formatCurrency(item.line_total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">{formatCurrency(quote.subtotal || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-medium">{formatCurrency(quote.tax_amount || 0)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                  <span>Total:</span>
                  <span>{formatCurrency(quote.total_amount || 0)}</span>
                </div>
              </div>
            </div>
          </div>

          {quote.notes && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Notes:</h3>
              <p className="text-gray-700">{quote.notes}</p>
            </div>
          )}

          {quote.terms && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Terms & Conditions:</h3>
              <p className="text-gray-700 whitespace-pre-line">{quote.terms}</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

