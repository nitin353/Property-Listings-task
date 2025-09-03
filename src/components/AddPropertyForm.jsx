import React, { useState } from 'react'

export default function AddPropertyForm({ onAdded, apiBase }) {
  const [form, setForm] = useState({ name: '', type: 'Apartment', price: '', location: '', description: '', image: '', lat: '', lng: '' })
  const [posting, setPosting] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.price || !form.location) {
      alert('Please provide Name, Price and Location.')
      return
    }
    const payload = {
      name: form.name,
      type: form.type,
      price: Number(form.price),
      location: form.location,
      description: form.description,
      image: form.image || `https://via.placeholder.com/800x500?text=${encodeURIComponent(form.name)}`,
      coords: form.lat && form.lng ? { lat: Number(form.lat), lng: Number(form.lng) } : null
    }
    setPosting(true)
    try {
      const res = await fetch(`${apiBase}/properties`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to add property')
      await res.json()
      setForm({ name: '', type: 'Apartment', price: '', location: '', description: '', image: '', lat: '', lng: '' })
      alert('Property added successfully!')
      if (onAdded) onAdded()
    } catch (err) {
      console.error(err)
      alert('Error adding property: ' + err.message)
    } finally {
      setPosting(false)
    }
  }

  return (
    <div>
      <h3 className="font-semibold mb-3">Add New Property</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" />
        <select name="type" value={form.type} onChange={handleChange} className="border p-2 rounded">
          <option>Apartment</option>
          <option>Villa</option>
          <option>House</option>
          <option>Plot</option>
        </select>
        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" className="border p-2 rounded" />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="border p-2 rounded" />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL (optional)" className="border p-2 rounded" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded" />
        <div className="flex gap-2">
          <input name="lat" value={form.lat} onChange={handleChange} placeholder="Latitude (opt)" className="border p-2 rounded w-1/2" />
          <input name="lng" value={form.lng} onChange={handleChange} placeholder="Longitude (opt)" className="border p-2 rounded w-1/2" />
        </div>
        <button disabled={posting} type="submit" className="bg-green-600 text-white p-2 rounded mt-2">{posting ? 'Adding...' : 'Add Property'}</button>
      </form>
    </div>
  )
}
