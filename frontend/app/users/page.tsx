'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import Layout from '@/components/Layout'
import api from '@/lib/api'

const ROLE_COLORS: Record<string, string> = {
  ADMIN: 'bg-purple-100 text-purple-800',
  BILLING: 'bg-blue-100 text-blue-800',
  INVENTORY_MANAGER: 'bg-green-100 text-green-800',
}

export default function UsersPage() {
  const router = useRouter()
  const [users, setUsers] = useState<any[]>([])
  const [roles, setRoles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users')
  const [showUserForm, setShowUserForm] = useState(false)
  const [showRoleForm, setShowRoleForm] = useState(false)
  const [error, setError] = useState('')

  const [newRole, setNewRole] = useState({ code: '', name: '', description: '' })
  const [newUser, setNewUser] = useState({ username: '', email: '', full_name: '', password: '', role: 'BILLING' })

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      router.push('/login')
      return
    }
    loadAll()
  }, [router])

  const loadAll = async () => {
    try {
      setLoading(true)
      setError('')
      const [u, r] = await Promise.all([api.get('/api/users/'), api.get('/api/roles/')])
      setUsers(u.data.users || [])
      setRoles(r.data.roles || [])
    } catch (e) {
      console.error(e)
      setError('Failed to load users/roles')
    } finally {
      setLoading(false)
    }
  }

  const loadUsers = async () => {
    try {
      setLoading(true)
      const response = await api.get('/api/users/')
      setUsers(response.data.users || [])
    } catch (error) {
      console.error('Failed to load users:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadRoles = async () => {
    try {
      const response = await api.get('/api/roles/')
      setRoles(response.data.roles || [])
    } catch (e) {
      console.error('Failed to load roles:', e)
    }
  }

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await api.post('/api/roles/', {
        code: newRole.code,
        name: newRole.name,
        description: newRole.description || null,
      })
      setShowRoleForm(false)
      setNewRole({ code: '', name: '', description: '' })
      await loadRoles()
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create role')
    }
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await api.post('/api/users/', {
        username: newUser.username,
        email: newUser.email,
        full_name: newUser.full_name || null,
        password: newUser.password,
        role: newUser.role,
      })
      setShowUserForm(false)
      setNewUser({ username: '', email: '', full_name: '', password: '', role: 'BILLING' })
      await loadUsers()
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create user')
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Users & Roles</h1>
            <p className="text-gray-600">Manage system users and their roles</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowRoleForm(true)}
              className="px-6 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              + New Role
            </button>
            <button
              onClick={() => setShowUserForm(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              + New User
            </button>
          </div>
        </div>

        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('roles')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'roles' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Roles
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {activeTab === 'users' ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Full Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.full_name || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${ROLE_COLORS[user.role] || 'bg-gray-100 text-gray-800'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {user.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {roles.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                      No roles found
                    </td>
                  </tr>
                ) : (
                  roles.map((role) => (
                    <tr key={role.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{role.code}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{role.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{role.description || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${role.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {role.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {showRoleForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-lg w-full p-6">
              <h2 className="text-xl font-bold mb-4">Create Role</h2>
              <form onSubmit={handleCreateRole} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role Code *</label>
                  <input
                    required
                    value={newRole.code}
                    onChange={(e) => setNewRole({ ...newRole, code: e.target.value })}
                    placeholder="e.g. SALES_MANAGER"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    required
                    value={newRole.name}
                    onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                    placeholder="e.g. Sales Manager"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newRole.description}
                    onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setShowRoleForm(false)} className="px-4 py-2 border rounded-lg">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showUserForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-lg w-full p-6">
              <h2 className="text-xl font-bold mb-4">Create User</h2>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
                    <input
                      required
                      value={newUser.username}
                      onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                    <select
                      required
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      {roles.map((r) => (
                        <option key={r.id} value={r.code}>
                          {r.code}
                        </option>
                      ))}
                      {roles.length === 0 && <option value="BILLING">BILLING</option>}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    required
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    value={newUser.full_name}
                    onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                  <input
                    required
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setShowUserForm(false)} className="px-4 py-2 border rounded-lg">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

