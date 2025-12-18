'use client'

import { useState, useEffect } from 'react'
import { quotesAPI, customersAPI, productsAPI, opportunitiesAPI } from '@/lib/api'

interface QuoteFormProps {
  quote?: any
  onSuccess: () => void
  onCancel: () => void
}

export default function QuoteForm({ quote, onSuccess, onCancel }: QuoteFormProps) {
  const [formData, setFormData] = useState({
    customer_id: '',
    opportunity_id: '',
    quote_date: new Date().toISOString().split('T')[0],
    valid_until: '',
    notes: '',
    terms: '',
  })
  const [items, setItems] = useState<any[]>([{ product_id: '', description: '', quantity: 1, unit_price: 0, tax_rate: 0 }])
  const [customers, setCustomers] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadCustomers()
    loadProducts()
    loadOpportunities()
    if (quote) {
      setFormData({
        customer_id: quote.customer_id || '',
        opportunity_id: quote.opportunity_id || '',
        quote_date: quote.quote_date || new Date().toISOString().split('T')[0],
        valid_until: quote.valid_until || '',
        notes: quote.notes || '',
        terms: quote.terms || '',
      })
      if (quote.items) {
        setItems(quote.items)
      }
    }
  }, [quote])

  const loadCustomers = async () => {
    try {
      const data = await customersAPI.list()
      setCustomers(data.customers || [])
    } catch (error) {
      console.error('Failed to load customers:', error)
    }
  }

  const loadProducts = async () => {
    try {
      const data = await productsAPI.list()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Failed to load products:', error)
    }
  }

  const loadOpportunities = async () => {
    try {
      const data = await opportunitiesAPI.list()
      setOpportunities(data.opportunities || [])
    } catch (error) {
      console.error('Failed to load opportunities:', error)
    }
  }

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    
    if (field === 'product_id' && value) {
      const product = products.find(p => p.id === parseInt(value))
      if (product) {
        newItems[index].description = product.name
        newItems[index].unit_price = product.sale_price || 0
        newItems[index].tax_rate = product.tax_rate || 0
      }
    }
    
    // Calculate line total
    if (field === 'quantity' || field === 'unit_price' || field === 'tax_rate') {
      const qty = field === 'quantity' ? parseFloat(value) || 0 : newItems[index].quantity
      const price = field === 'unit_price' ? parseFloat(value) || 0 : newItems[index].unit_price
      newItems[index].line_total = qty * price
    }
    
    setItems(newItems)
  }

  const addItem = () => {
    setItems([...items, { product_id: '', description: '', quantity: 1, unit_price: 0, tax_rate: 0, line_total: 0 }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (items.length === 0 || items.some(item => !item.description || item.quantity <= 0)) {
      setError('Please add at least one valid item')
      return
    }

    setLoading(true)

    try {
      const quoteData = {
        ...formData,
        customer_id: formData.customer_id ? parseInt(formData.customer_id) : null,
        opportunity_id: formData.opportunity_id ? parseInt(formData.opportunity_id) : null,
        items: items.map(item => ({
          product_id: item.product_id ? parseInt(item.product_id) : null,
          description: item.description,
          quantity: parseFloat(item.quantity) || 0,
          unit_price: parseFloat(item.unit_price) || 0,
          tax_rate: parseFloat(item.tax_rate) || 0,
          line_total: (parseFloat(item.quantity) || 0) * (parseFloat(item.unit_price) || 0),
        }))
      }
      
      if (quote?.id) {
        await quotesAPI.update(quote.id, quoteData)
      } else {
        await quotesAPI.create(quoteData)
      }
      onSuccess()
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to save quote')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">
            {quote ? 'Edit Quote' : 'Create Quote'}
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer
                </label>
                <select
                  value={formData.customer_id}
                  onChange={(e) => setFormData({ ...formData, customer_id: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Customer</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Opportunity
                </label>
                <select
                  value={formData.opportunity_id}
                  onChange={(e) => setFormData({ ...formData, opportunity_id: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Opportunity</option>
                  {opportunities.map((opp) => (
                    <option key={opp.id} value={opp.id}>
                      {opp.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quote Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.quote_date}
                  onChange={(e) => setFormData({ ...formData, quote_date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Valid Until
                </label>
                <input
                  type="date"
                  value={formData.valid_until}
                  onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Terms & Conditions
              </label>
              <textarea
                value={formData.terms}
                onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Items *
                </label>
                <button
                  type="button"
                  onClick={addItem}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  + Add Item
                </button>
              </div>
              <div className="space-y-2">
                {items.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 items-end p-2 border border-gray-200 rounded">
                    <div className="col-span-3">
                      <label className="block text-xs text-gray-600 mb-1">Product</label>
                      <select
                        value={item.product_id}
                        onChange={(e) => handleItemChange(index, 'product_id', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                      >
                        <option value="">Select</option>
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-4">
                      <label className="block text-xs text-gray-600 mb-1">Description *</label>
                      <input
                        type="text"
                        required
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-xs text-gray-600 mb-1">Qty</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs text-gray-600 mb-1">Price</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={item.unit_price}
                        onChange={(e) => handleItemChange(index, 'unit_price', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-xs text-gray-600 mb-1">Tax %</label>
                      <input
                        type="number"
                        step="0.01"
                        value={item.tax_rate}
                        onChange={(e) => handleItemChange(index, 'tax_rate', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                      />
                    </div>
                    <div className="col-span-1">
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

