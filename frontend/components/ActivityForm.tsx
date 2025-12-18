'use client'

import { useState, useEffect } from 'react'
import { activitiesAPI, customersAPI, opportunitiesAPI, quotesAPI } from '@/lib/api'

interface ActivityFormProps {
  activity?: any
  onSuccess: () => void
  onCancel: () => void
}

const TYPES = ['CALL', 'EMAIL', 'MEETING', 'TASK', 'NOTE']
const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'URGENT']

export default function ActivityForm({ activity, onSuccess, onCancel }: ActivityFormProps) {
  const [formData, setFormData] = useState({
    customer_id: '',
    opportunity_id: '',
    quote_id: '',
    type: 'TASK',
    subject: '',
    description: '',
    due_date: '',
    priority: 'MEDIUM',
  })
  const [customers, setCustomers] = useState<any[]>([])
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [quotes, setQuotes] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadCustomers()
    loadOpportunities()
    loadQuotes()
    if (activity) {
      setFormData({
        customer_id: activity.customer_id || '',
        opportunity_id: activity.opportunity_id || '',
        quote_id: activity.quote_id || '',
        type: activity.type || 'TASK',
        subject: activity.subject || '',
        description: activity.description || '',
        due_date: activity.due_date ? activity.due_date.split('T')[0] : '',
        priority: activity.priority || 'MEDIUM',
      })
    }
  }, [activity])

  const loadCustomers = async () => {
    try {
      const data = await customersAPI.list()
      setCustomers(data.customers || [])
    } catch (error) {
      console.error('Failed to load customers:', error)
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

  const loadQuotes = async () => {
    try {
      const data = await quotesAPI.list()
      setQuotes(data.quotes || [])
    } catch (error) {
      console.error('Failed to load quotes:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = {
        ...formData,
        customer_id: formData.customer_id ? parseInt(formData.customer_id) : null,
        opportunity_id: formData.opportunity_id ? parseInt(formData.opportunity_id) : null,
        quote_id: formData.quote_id ? parseInt(formData.quote_id) : null,
        due_date: formData.due_date ? `${formData.due_date}T00:00:00` : null,
      }

      if (activity?.id) {
        await activitiesAPI.update(activity.id, data)
      } else {
        await activitiesAPI.create(data)
      }
      onSuccess()
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to save activity')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">
            {activity ? 'Edit Activity' : 'Create Activity'}
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
                  Type *
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority *
                </label>
                <select
                  required
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {PRIORITIES.map((priority) => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quote
                </label>
                <select
                  value={formData.quote_id}
                  onChange={(e) => setFormData({ ...formData, quote_id: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Quote</option>
                  {quotes.map((quote) => (
                    <option key={quote.id} value={quote.id}>
                      {quote.quote_number}
                    </option>
                  ))}
                </select>
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

