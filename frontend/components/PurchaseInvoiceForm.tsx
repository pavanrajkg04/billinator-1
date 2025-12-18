'use client'

import { useState, useEffect } from 'react'
import api from '@/lib/api'
import { productsAPI } from '@/lib/api'

interface PurchaseInvoiceFormProps {
  onSuccess: () => void
  onCancel: () => void
}

export default function PurchaseInvoiceForm({ onSuccess, onCancel }: PurchaseInvoiceFormProps) {
  const [formData, setFormData] = useState({
    supplier_id: '',
    invoice_date: new Date().toISOString().split('T')[0],
    due_date: '',
    notes: '',
  })
  const [items, setItems] = useState<any[]>([{ product_id: '', description: '', quantity: 1, unit_price: 0, tax_rate: 0 }])
  const [suppliers, setSuppliers] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadSuppliers()
    loadProducts()
  }, [])

  const loadSuppliers = async () => {
    try {
      const response = await api.get('/api/suppliers/')
      setSuppliers(response.data.suppliers || [])
    } catch (error) {
      console.error('Failed to load suppliers:', error)
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

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    
    // If product selected, auto-fill description and price
    if (field === 'product_id' && value) {
      const product = products.find(p => p.id === parseInt(value))
      if (product) {
        newItems[index].description = product.name
        newItems[index].unit_price = product.purchase_price || product.sale_price || 0
        newItems[index].tax_rate = product.tax_rate || 0
      }
    }
    
    setItems(newItems)
  }

  const addItem = () => {
    setItems([...items, { product_id: '', description: '', quantity: 1, unit_price: 0, tax_rate: 0 }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!formData.supplier_id) {
      setError('Please select a supplier')
      return
    }
    
    if (items.length === 0 || items.some(item => !item.description || item.quantity <= 0)) {
      setError('Please add at least one valid item')
      return
    }

    setLoading(true)

    try {
      const invoiceData = {
        ...formData,
        supplier_id: parseInt(formData.supplier_id),
        items: items.map(item => ({
          product_id: item.product_id ? parseInt(item.product_id) : null,
          description: item.description,
          quantity: parseFloat(item.quantity) || 0,
          unit_price: parseFloat(item.unit_price) || 0,
          tax_rate: parseFloat(item.tax_rate) || 0,
        }))
      }
      
      await api.post('/api/purchases/', invoiceData)
      onSuccess()
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create purchase invoice')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Create Purchase Invoice</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Supplier *
                </label>
                <select
                  required
                  value={formData.supplier_id}
                  onChange={(e) => setFormData({ ...formData, supplier_id: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Invoice Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.invoice_date}
                  onChange={(e) => setFormData({ ...formData, invoice_date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={formData.due_date}
                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
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
                {loading ? 'Creating...' : 'Create Invoice'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

