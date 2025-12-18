'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Cookies from 'js-cookie'
import Layout from '@/components/Layout'
import { formatCurrency, formatDate } from '@/lib/utils'
import api from '@/lib/api'
import Link from 'next/link'

export default function SalesInvoiceDetailPage() {
  const router = useRouter()
  const params = useParams()
  const invoiceId = parseInt(params.id as string)
  
  const [invoice, setInvoice] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showPayment, setShowPayment] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState('')
  const [paymentMode, setPaymentMode] = useState('CASH')
  const [paymentError, setPaymentError] = useState('')

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      router.push('/login')
      return
    }
    loadInvoice()
  }, [router, invoiceId])

  const loadInvoice = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/api/sales/${invoiceId}`)
      setInvoice(response.data.invoice)
    } catch (error) {
      console.error('Failed to load invoice:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const recordPayment = async () => {
    try {
      setPaymentError('')
      const amt = parseFloat(paymentAmount)
      if (!amt || amt <= 0) {
        setPaymentError('Enter a valid payment amount')
        return
      }
      await api.post(`/api/sales/${invoiceId}/payments`, {
        amount: amt,
        payment_mode: paymentMode,
      })
      setShowPayment(false)
      setPaymentAmount('')
      await loadInvoice()
    } catch (err: any) {
      setPaymentError(err.response?.data?.detail || 'Failed to record payment')
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

  if (!invoice) {
    return (
      <Layout>
        <div className="p-8">
          <div className="text-center text-gray-500">Invoice not found</div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/sales" className="text-blue-600 hover:text-blue-900">
            ← Back to Sales
          </Link>
          <div className="flex gap-3">
            {((invoice.total_amount || 0) - (invoice.paid_amount || 0)) > 0 && (
              <button
                onClick={() => setShowPayment(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                💳 Record Payment
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
          {/* Invoice Header */}
          <div className="border-b border-gray-200 pb-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Sales Invoice</h1>
                <p className="text-gray-600">Invoice #: {invoice.invoice_number}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Date: {formatDate(invoice.invoice_date)}</p>
                {invoice.due_date && (
                  <p className="text-sm text-gray-600">Due Date: {formatDate(invoice.due_date)}</p>
                )}
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Bill To:</h3>
              <p className="text-gray-700">{invoice.customer_name || 'Walk-in Customer'}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Invoice Type:</h3>
              <p className="text-gray-700">{invoice.invoice_type}</p>
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
                {invoice.items && invoice.items.map((item: any, index: number) => (
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
                  <span className="font-medium">{formatCurrency(invoice.subtotal || 0)}</span>
                </div>
                {invoice.cgst_amount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">CGST:</span>
                    <span className="font-medium">{formatCurrency(invoice.cgst_amount)}</span>
                  </div>
                )}
                {invoice.sgst_amount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">SGST:</span>
                    <span className="font-medium">{formatCurrency(invoice.sgst_amount)}</span>
                  </div>
                )}
                {invoice.igst_amount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">IGST:</span>
                    <span className="font-medium">{formatCurrency(invoice.igst_amount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                  <span>Total:</span>
                  <span>{formatCurrency(invoice.total_amount || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Paid:</span>
                  <span className="font-medium">{formatCurrency(invoice.paid_amount || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Outstanding:</span>
                  <span className="font-medium text-red-600">
                    {formatCurrency((invoice.total_amount || 0) - (invoice.paid_amount || 0))}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {invoice.notes && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Notes:</h3>
              <p className="text-gray-700">{invoice.notes}</p>
            </div>
          )}
        </div>

        {showPayment && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold">Record Payment</h2>
                  <p className="text-sm text-gray-600">
                    Outstanding: {formatCurrency((invoice.total_amount || 0) - (invoice.paid_amount || 0))}
                  </p>
                </div>
                <button onClick={() => setShowPayment(false)} className="text-gray-500 hover:text-gray-800">
                  ✕
                </button>
              </div>

              {paymentError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                  {paymentError}
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mode</label>
                  <select
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="CASH">CASH</option>
                    <option value="UPI">UPI</option>
                    <option value="CARD">CARD</option>
                    <option value="BANK_TRANSFER">BANK_TRANSFER</option>
                    <option value="CHEQUE">CHEQUE</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setShowPayment(false)} className="px-4 py-2 border rounded-lg">
                  Cancel
                </button>
                <button onClick={recordPayment} className="px-4 py-2 bg-green-600 text-white rounded-lg">
                  Record
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

