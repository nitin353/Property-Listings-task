import React, { useEffect, useState } from 'react'
import PropertyCard from './components/PropertyCard'
import PropertyModal from './components/PropertyModal'
import AddPropertyForm from './components/AddPropertyForm'
import { Search, Plus, RefreshCcw } from 'lucide-react'

export default function App() {
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'
  const GET_URL = `${API_BASE}/properties`

  const [properties, setProperties] = useState([])
  const [filtered, setFiltered] = useState([])
  const [types, setTypes] = useState([])
  const [selectedType, setSelectedType] = useState('All')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [showModal, setShowModal] = useState(false)
  const [activeProperty, setActiveProperty] = useState(null)

  useEffect(() => {
    fetchProperties()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [properties, selectedType, search])

  async function fetchProperties() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(GET_URL)
      if (!res.ok) throw new Error('Failed to fetch properties')
      const data = await res.json()
      setProperties(data)

      const uniq = Array.from(new Set(data.map((p) => p.type))).sort()
      setTypes(['All', ...uniq])
    } catch (err) {
      console.error('Fetch error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function applyFilters() {
    let list = [...properties]
    if (selectedType !== 'All') {
      list = list.filter((p) => p.type === selectedType)
    }
    if (search.trim() !== '') {
      const q = search.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q)
      )
    }
    setFiltered(list)
  }

  function openModal(property) {
    setActiveProperty(property)
    setShowModal(true)
  }

  function closeModal() {
    setActiveProperty(null)
    setShowModal(false)
  }

  async function handleAddProperty() {
    await fetchProperties()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            🏡 Property Listings
          </h1>
          <div className="text-gray-500 text-sm">Demo using JSON Server</div>
        </header>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow p-4 sm:p-6 mb-8 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex gap-3 items-center w-full md:w-auto">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500"
            >
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or location..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 w-full text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={() => {
                setSelectedType('All')
                setSearch('')
              }}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition"
            >
              <RefreshCcw className="h-4 w-4" /> Reset
            </button>
          </div>

          <div className="ml-auto">
            <button
              onClick={() =>
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: 'smooth',
                })
              }
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
            >
              <Plus className="h-4 w-4" /> Add Property
            </button>
          </div>
        </div>

        {/* Main */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {loading ? (
              <div className="p-6 bg-white rounded-2xl shadow text-center text-gray-500">
                Loading properties...
              </div>
            ) : error ? (
              <div className="p-6 bg-red-100 rounded-2xl shadow text-center text-red-700">
                Error: {error}
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-6 bg-white rounded-2xl shadow text-center text-gray-500">
                No properties found.
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                {filtered.map((p) => (
                  <PropertyCard
                    key={p.id}
                    property={p}
                    onView={() => openModal(p)}
                  />
                ))}
              </div>
            )}
          </div>

          <aside className="bg-white rounded-2xl shadow-lg p-6 sticky top-8 h-fit">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              
            </h2>
            <AddPropertyForm onAdded={handleAddProperty} apiBase={API_BASE} />
          </aside>
        </div>

        {showModal && activeProperty && (
          <PropertyModal property={activeProperty} onClose={closeModal} />
        )}

        <footer className="mt-12 text-center text-sm text-gray-500">
          Built with ❤️ using React + Tailwind
        </footer>
      </div>
    </div>
  )
}
