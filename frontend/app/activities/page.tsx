'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { activitiesAPI } from '@/lib/api'
import Cookies from 'js-cookie'
import Layout from '@/components/Layout'
import { formatDate } from '@/lib/utils'
import ActivityForm from '@/components/ActivityForm'
import api from '@/lib/api'

const TYPE_COLORS: Record<string, string> = {
  CALL: 'bg-blue-100 text-blue-800',
  EMAIL: 'bg-green-100 text-green-800',
  MEETING: 'bg-purple-100 text-purple-800',
  TASK: 'bg-orange-100 text-orange-800',
  NOTE: 'bg-gray-100 text-gray-800',
}

const PRIORITY_COLORS: Record<string, string> = {
  LOW: 'bg-gray-100 text-gray-800',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  HIGH: 'bg-orange-100 text-orange-800',
  URGENT: 'bg-red-100 text-red-800',
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  COMPLETED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
}

export default function ActivitiesPage() {
  const router = useRouter()
  const [activities, setActivities] = useState<any[]>([])
  const [pendingTasks, setPendingTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filterType, setFilterType] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingActivity, setEditingActivity] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      router.push('/login')
      return
    }
    loadActivities()
  }, [router, filterType, filterStatus])

  const loadActivities = async () => {
    try {
      setLoading(true)
      const filters: any = {}
      if (filterType) filters.type = filterType
      if (filterStatus) filters.status = filterStatus
      
      const [activitiesData, pendingData] = await Promise.all([
        activitiesAPI.list(filters),
        activitiesAPI.getPending()
      ])
      
      setActivities(activitiesData.activities || [])
      setPendingTasks(pendingData.tasks || [])
    } catch (error) {
      console.error('Failed to load activities:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingActivity(null)
    loadActivities()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this activity?')) return
    try {
      await activitiesAPI.delete(id)
      loadActivities()
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to delete activity')
    }
  }

  const handleComplete = async (id: number) => {
    try {
      await activitiesAPI.update(id, { status: 'COMPLETED' })
      loadActivities()
    } catch (error) {
      console.error('Failed to complete activity:', error)
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Activities & Tasks</h1>
            <p className="text-gray-600">Manage your tasks, calls, meetings, and notes</p>
          </div>
          <button
            onClick={() => {
              setEditingActivity(null)
              setShowForm(true)
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            + New Activity
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Pending Tasks Summary */}
        {pendingTasks.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-yellow-800 mb-2">
              ⚠️ You have {pendingTasks.length} pending task{pendingTasks.length > 1 ? 's' : ''}
            </h2>
            <div className="space-y-2">
              {pendingTasks.slice(0, 3).map((task) => (
                <div key={task.id} className="text-sm text-yellow-700">
                  • {task.subject} {task.due_date && `(Due: ${formatDate(task.due_date)})`}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => {
              setFilterType(null)
              setFilterStatus(null)
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filterType === null && filterStatus === null
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {Object.keys(TYPE_COLORS).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filterType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
          <div className="ml-4 flex gap-2">
            <button
              onClick={() => setFilterStatus('PENDING')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filterStatus === 'PENDING'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilterStatus('COMPLETED')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filterStatus === 'COMPLETED'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Activities List */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activities.filter(a => 
                a.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (a.description && a.description.toLowerCase().includes(searchTerm.toLowerCase()))
              ).length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    {searchTerm ? 'No activities match your search' : 'No activities found'}
                  </td>
                </tr>
              ) : (
                activities.filter(a => 
                  a.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  (a.description && a.description.toLowerCase().includes(searchTerm.toLowerCase()))
                ).map((activity) => (
                  <tr key={activity.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${TYPE_COLORS[activity.type] || 'bg-gray-100 text-gray-800'}`}>
                        {activity.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {activity.subject}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {activity.description || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.due_date ? formatDate(activity.due_date) : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${PRIORITY_COLORS[activity.priority] || 'bg-gray-100 text-gray-800'}`}>
                        {activity.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${STATUS_COLORS[activity.status] || 'bg-gray-100 text-gray-800'}`}>
                        {activity.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {activity.status === 'PENDING' && (
                        <button
                          onClick={() => handleComplete(activity.id)}
                          className="text-green-600 hover:text-green-900 mr-3"
                        >
                          Complete
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setEditingActivity(activity)
                          setShowForm(true)
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(activity.id)}
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
          <ActivityForm
            activity={editingActivity}
            onSuccess={handleFormSuccess}
            onCancel={() => {
              setShowForm(false)
              setEditingActivity(null)
            }}
          />
        )}
      </div>
    </Layout>
  )
}

