'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { customersAPI, notesAPI, contactsAPI, opportunitiesAPI, quotesAPI, activitiesAPI } from '@/lib/api'
import Cookies from 'js-cookie'
import Layout from '@/components/Layout'
import { formatCurrency, formatDate } from '@/lib/utils'
import Link from 'next/link'
import api from '@/lib/api'

export default function CustomerDetailPage() {
  const router = useRouter()
  const params = useParams()
  const customerId = parseInt(params.id as string)
  
  const [customer, setCustomer] = useState<any>(null)
  const [notes, setNotes] = useState<any[]>([])
  const [contacts, setContacts] = useState<any[]>([])
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [quotes, setQuotes] = useState<any[]>([])
  const [activities, setActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [showNoteForm, setShowNoteForm] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [newNote, setNewNote] = useState({ subject: '', content: '', note_type: 'NOTE' })
  const [newContact, setNewContact] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    mobile: '',
    designation: '',
    department: '',
    is_primary: false,
  })

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      router.push('/login')
      return
    }
    loadCustomerData()
  }, [router, customerId])

  const loadCustomerData = async () => {
    try {
      setLoading(true)
      const [customerData, notesData, contactsData, oppsData, quotesData, activitiesData] = await Promise.all([
        customersAPI.get(customerId),
        notesAPI.list(customerId),
        contactsAPI.list(customerId),
        opportunitiesAPI.list({ customer_id: customerId }),
        quotesAPI.list({ customer_id: customerId }),
        activitiesAPI.list({ customer_id: customerId }),
      ])
      
      setCustomer(customerData.customer)
      setNotes(notesData.notes || [])
      setContacts(contactsData.contacts || [])
      setOpportunities(oppsData.opportunities || [])
      setQuotes(quotesData.quotes || [])
      setActivities(activitiesData.activities || [])
    } catch (error) {
      console.error('Failed to load customer data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await notesAPI.create({
        customer_id: customerId,
        ...newNote,
      })
      setNewNote({ subject: '', content: '', note_type: 'NOTE' })
      setShowNoteForm(false)
      loadCustomerData()
    } catch (error) {
      console.error('Failed to add note:', error)
    }
  }

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await contactsAPI.create({
        customer_id: customerId,
        ...newContact,
      })
      setNewContact({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        mobile: '',
        designation: '',
        department: '',
        is_primary: false,
      })
      setShowContactForm(false)
      loadCustomerData()
    } catch (error) {
      console.error('Failed to add contact:', error)
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

  if (!customer) {
    return (
      <Layout>
        <div className="p-8">
          <div className="text-center text-gray-500">Customer not found</div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-6">
          <Link href="/customers" className="text-blue-600 hover:text-blue-900 mb-4 inline-block">
            ← Back to Customers
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{customer.name}</h1>
          <p className="text-gray-600">Customer Details & History</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {['overview', 'notes', 'contacts', 'opportunities', 'quotes', 'activities'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4">Customer Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">GSTIN</label>
                  <p className="text-gray-900">{customer.gstin || '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-900">{customer.email || '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p className="text-gray-900">{customer.phone || '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Outstanding Balance</label>
                  <p className="text-gray-900 font-semibold">{formatCurrency(customer.outstanding_balance || 0)}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-500">Address</label>
                  <p className="text-gray-900">
                    {customer.address || '-'}
                    {customer.city && `, ${customer.city}`}
                    {customer.state && `, ${customer.state}`}
                    {customer.pincode && ` - ${customer.pincode}`}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Opportunities</h3>
                <p className="text-2xl font-bold text-gray-900">{opportunities.length}</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Quotes</h3>
                <p className="text-2xl font-bold text-gray-900">{quotes.length}</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Activities</h3>
                <p className="text-2xl font-bold text-gray-900">{activities.length}</p>
              </div>
            </div>
          </div>
        )}

        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Notes & Communication</h2>
              <button
                onClick={() => setShowNoteForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                + Add Note
              </button>
            </div>

            {showNoteForm && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <form onSubmit={handleAddNote} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={newNote.note_type}
                      onChange={(e) => setNewNote({ ...newNote, note_type: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="NOTE">Note</option>
                      <option value="CALL">Call</option>
                      <option value="EMAIL">Email</option>
                      <option value="MEETING">Meeting</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      value={newNote.subject}
                      onChange={(e) => setNewNote({ ...newNote, subject: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
                    <textarea
                      required
                      value={newNote.content}
                      onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowNoteForm(false)
                        setNewNote({ subject: '', content: '', note_type: 'NOTE' })
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                      Save Note
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="space-y-4">
              {notes.map((note) => (
                <div key={note.id} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-xs font-medium text-gray-500">{note.note_type}</span>
                      {note.subject && <h3 className="font-semibold text-gray-900">{note.subject}</h3>}
                    </div>
                    <span className="text-xs text-gray-500">{formatDate(note.created_at)}</span>
                  </div>
                  <p className="text-gray-700">{note.content}</p>
                  {note.created_by_name && (
                    <p className="text-xs text-gray-500 mt-2">By: {note.created_by_name}</p>
                  )}
                </div>
              ))}
              {notes.length === 0 && (
                <div className="text-center text-gray-500 py-8">No notes yet</div>
              )}
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Contacts</h2>
              <button
                onClick={() => setShowContactForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                + Add Contact
              </button>
            </div>

            {showContactForm && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <form onSubmit={handleAddContact} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                      <input
                        type="text"
                        required
                        value={newContact.first_name}
                        onChange={(e) => setNewContact({ ...newContact, first_name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        value={newContact.last_name}
                        onChange={(e) => setNewContact({ ...newContact, last_name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={newContact.email}
                        onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="text"
                        value={newContact.phone}
                        onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                      <input
                        type="text"
                        value={newContact.designation}
                        onChange={(e) => setNewContact({ ...newContact, designation: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <input
                        type="text"
                        value={newContact.department}
                        onChange={(e) => setNewContact({ ...newContact, department: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newContact.is_primary}
                        onChange={(e) => setNewContact({ ...newContact, is_primary: e.target.checked })}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Primary Contact</span>
                    </label>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowContactForm(false)
                        setNewContact({
                          first_name: '',
                          last_name: '',
                          email: '',
                          phone: '',
                          mobile: '',
                          designation: '',
                          department: '',
                          is_primary: false,
                        })
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                      Save Contact
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Designation</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {contacts.map((contact) => (
                    <tr key={contact.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">
                            {contact.first_name} {contact.last_name}
                          </span>
                          {contact.is_primary && (
                            <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">Primary</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.email || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.phone || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.designation || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {contacts.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No contacts yet</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Opportunities Tab */}
        {activeTab === 'opportunities' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Related Opportunities</h2>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Probability</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {opportunities.map((opp) => (
                    <tr key={opp.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{opp.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{opp.stage}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(opp.value)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{opp.probability}%</td>
                    </tr>
                  ))}
                  {opportunities.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No opportunities</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Quotes Tab */}
        {activeTab === 'quotes' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Related Quotes</h2>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quote Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {quotes.map((quote) => (
                    <tr key={quote.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{quote.quote_number}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(quote.quote_date)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(quote.total_amount)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quote.status}</td>
                    </tr>
                  ))}
                  {quotes.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No quotes</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Activities Tab */}
        {activeTab === 'activities' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Related Activities</h2>
            <div className="space-y-2">
              {activities.map((activity) => (
                <div key={activity.id} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-medium text-gray-500">{activity.type}</span>
                      <h3 className="font-semibold text-gray-900">{activity.subject}</h3>
                      {activity.description && <p className="text-sm text-gray-600 mt-1">{activity.description}</p>}
                    </div>
                    <div className="text-right">
                      {activity.due_date && <p className="text-xs text-gray-500">{formatDate(activity.due_date)}</p>}
                      <span className={`text-xs px-2 py-1 rounded ${
                        activity.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                        activity.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {activities.length === 0 && (
                <div className="text-center text-gray-500 py-8">No activities</div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

