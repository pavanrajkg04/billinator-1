'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import Layout from '@/components/Layout'
import api from '@/lib/api'

export default function ReportsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reports, setReports] = useState<any[]>([])

  const [showModal, setShowModal] = useState(false)
  const [selectedReport, setSelectedReport] = useState<any>(null)

  const [customers, setCustomers] = useState<any[]>([])
  const [suppliers, setSuppliers] = useState<any[]>([])

  const [filters, setFilters] = useState({
    start_date: '',
    end_date: '',
    customer_id: '',
    supplier_id: '',
  })

  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      router.push('/login')
      return
    }
    loadReports()
  }, [router])

  const loadReports = async () => {
    try {
      setLoading(true)
      setError('')
      const res = await api.get('/api/reports/')
      setReports(res.data.reports || [])
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to load reports')
    } finally {
      setLoading(false)
    }
  }

  const openReport = async (report: any) => {
    setSelectedReport(report)
    setResult(null)
    setError('')
    setFilters({ start_date: '', end_date: '', customer_id: '', supplier_id: '' })
    setShowModal(true)

    // Load filter dropdown data if needed
    try {
      if (report.id === 'sales' || report.id === 'customer') {
        const c = await api.get('/api/customers/')
        setCustomers(c.data.customers || [])
      }
      if (report.id === 'purchase') {
        const s = await api.get('/api/suppliers/')
        setSuppliers(s.data.suppliers || [])
      }
    } catch (e) {
      // Non-blocking; user can still generate without selecting
    }
  }

  const generate = async () => {
    if (!selectedReport) return
    try {
      setGenerating(true)
      setError('')

      const payload: any = {
        report_type: selectedReport.id,
        start_date: filters.start_date || null,
        end_date: filters.end_date || null,
      }
      if (selectedReport.id === 'sales' || selectedReport.id === 'customer') {
        payload.customer_id = filters.customer_id ? parseInt(filters.customer_id) : null
      }
      if (selectedReport.id === 'purchase') {
        payload.supplier_id = filters.supplier_id ? parseInt(filters.supplier_id) : null
      }

      const res = await api.post('/api/reports/generate', payload)
      setResult(res.data)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to generate report')
    } finally {
      setGenerating(false)
    }
  }

  const downloadCSV = () => {
    if (!result?.data || !Array.isArray(result.data) || result.data.length === 0) return
    const rows = result.data
    const headers = Object.keys(rows[0])
    const escape = (v: any) => `"${String(v ?? '').replaceAll('"', '""')}"`
    const csv = [
      headers.join(','),
      ...rows.map((r: any) => headers.map((h) => escape(r[h])).join(',')),
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `report-${result.report_type || 'data'}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const renderResultTable = () => {
    if (!result?.data || !Array.isArray(result.data)) return null
    if (result.data.length === 0) {
      return <div className="text-gray-600">No data for this report.</div>
    }
    const cols = Object.keys(result.data[0])
    return (
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {cols.map((c) => (
                <th key={c} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {result.data.slice(0, 200).map((row: any, idx: number) => (
              <tr key={idx} className="hover:bg-gray-50">
                {cols.map((c) => (
                  <td key={c} className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                    {row?.[c] ?? ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {result.data.length > 200 && (
          <div className="px-4 py-2 text-xs text-gray-500">Showing first 200 rows. Export CSV for full data.</div>
        )}
      </div>
    )
  }

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Reports</h1>
          <p className="text-gray-600">View and generate business reports</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map((r) => (
                <div
                  key={r.id}
                  onClick={() => openReport(r)}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{r.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{r.description}</p>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">Generate Report →</button>
                </div>
              ))}
            </div>

            {result && (
              <div className="mt-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 capitalize">{result.report_type} report</h2>
                    {result.summary && (
                      <div className="text-sm text-gray-600 mt-1">
                        {Object.entries(result.summary).map(([k, v]) => (
                          <span key={k} className="inline-block mr-4">
                            <span className="font-medium">{k}:</span> {String(v)}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {Array.isArray(result.data) && result.data.length > 0 && (
                    <button
                      onClick={downloadCSV}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Export CSV
                    </button>
                  )}
                </div>

                {renderResultTable()}
              </div>
            )}
          </>
        )}

        {showModal && selectedReport && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-xl w-full p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold">{selectedReport.name}</h2>
                  <p className="text-sm text-gray-600">{selectedReport.description}</p>
                </div>
                <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-800">
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={filters.start_date}
                    onChange={(e) => setFilters({ ...filters, start_date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={filters.end_date}
                    onChange={(e) => setFilters({ ...filters, end_date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                {(selectedReport.id === 'sales' || selectedReport.id === 'customer') && (
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer (optional)</label>
                    <select
                      value={filters.customer_id}
                      onChange={(e) => setFilters({ ...filters, customer_id: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">All customers</option>
                      {customers.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {selectedReport.id === 'purchase' && (
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Supplier (optional)</label>
                    <select
                      value={filters.supplier_id}
                      onChange={(e) => setFilters({ ...filters, supplier_id: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">All suppliers</option>
                      {suppliers.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg">
                  Cancel
                </button>
                <button
                  onClick={generate}
                  disabled={generating}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                >
                  {generating ? 'Generating…' : 'Generate'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

