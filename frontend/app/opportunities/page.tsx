'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { opportunitiesAPI } from '@/lib/api'
import Cookies from 'js-cookie'
import Layout from '@/components/Layout'
import { formatCurrency, formatDate } from '@/lib/utils'
import Link from 'next/link'
import OpportunityForm from '@/components/OpportunityForm'
import api from '@/lib/api'

const STAGES = [
  { value: 'LEAD', label: 'Lead', color: 'bg-gray-100 text-gray-800' },
  { value: 'QUALIFIED', label: 'Qualified', color: 'bg-blue-100 text-blue-800' },
  { value: 'PROPOSAL', label: 'Proposal', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'NEGOTIATION', label: 'Negotiation', color: 'bg-orange-100 text-orange-800' },
  { value: 'WON', label: 'Won', color: 'bg-green-100 text-green-800' },
  { value: 'LOST', label: 'Lost', color: 'bg-red-100 text-red-800' },
]

export default function OpportunitiesPage() {
  const router = useRouter()
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [pipelineStats, setPipelineStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedStage, setSelectedStage] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingOpportunity, setEditingOpportunity] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      router.push('/login')
      return
    }
    loadData()
  }, [router, selectedStage])

  const loadData = async () => {
    try {
      setLoading(true)
      const filters: any = {}
      if (selectedStage) filters.stage = selectedStage
      
      const [oppsData, statsData] = await Promise.all([
        opportunitiesAPI.list(filters),
        opportunitiesAPI.getPipeline()
      ])
      
      setOpportunities(oppsData.opportunities || [])
      setPipelineStats(statsData)
    } catch (error) {
      console.error('Failed to load opportunities:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingOpportunity(null)
    loadData()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this opportunity?')) return
    try {
      await opportunitiesAPI.delete(id)
      loadData()
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to delete opportunity')
    }
  }

  const filteredOpportunities = opportunities.filter((opp) =>
    opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (opp.description && opp.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const getStageColor = (stage: string) => {
    const stageObj = STAGES.find(s => s.value === stage)
    return stageObj?.color || 'bg-gray-100 text-gray-800'
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Sales Pipeline</h1>
            <p className="text-gray-600">Manage your sales opportunities and deals</p>
          </div>
          <button
            onClick={() => {
              setEditingOpportunity(null)
              setShowForm(true)
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            + New Opportunity
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search opportunities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Pipeline Stats */}
        {pipelineStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            {STAGES.map((stage) => {
              const stats = pipelineStats[stage.value] || { count: 0, value: 0 }
              return (
                <div key={stage.value} className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{stage.label}</div>
                  <div className="text-2xl font-bold text-gray-900">{stats.count}</div>
                  <div className="text-xs text-gray-500">{formatCurrency(stats.value)}</div>
                </div>
              )
            })}
          </div>
        )}

        {/* Stage Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedStage(null)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedStage === null
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {STAGES.map((stage) => (
            <button
              key={stage.value}
              onClick={() => setSelectedStage(stage.value)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedStage === stage.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {stage.label}
            </button>
          ))}
        </div>

        {/* Opportunities List */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Probability</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expected Close</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOpportunities.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    {searchTerm ? 'No opportunities match your search' : 'No opportunities found'}
                  </td>
                </tr>
              ) : (
                filteredOpportunities.map((opp) => (
                  <tr key={opp.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{opp.title}</div>
                      {opp.description && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">{opp.description}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {opp.customer_id ? `Customer #${opp.customer_id}` : 'No customer'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStageColor(opp.stage)}`}>
                        {STAGES.find(s => s.value === opp.stage)?.label || opp.stage}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(opp.value)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {opp.probability}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {opp.expected_close_date ? formatDate(opp.expected_close_date) : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setEditingOpportunity(opp)
                          setShowForm(true)
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(opp.id)}
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
          <OpportunityForm
            opportunity={editingOpportunity}
            onSuccess={handleFormSuccess}
            onCancel={() => {
              setShowForm(false)
              setEditingOpportunity(null)
            }}
          />
        )}
      </div>
    </Layout>
  )
}

