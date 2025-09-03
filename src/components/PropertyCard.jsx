import React from 'react'

export default function PropertyCard({ property, onView }) {
  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <img src={property.image || `https://via.placeholder.com/800x500?text=${encodeURIComponent(property.name)}`} alt={property.name} className="h-40 w-full object-cover" />
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h2 className="font-semibold text-lg">{property.name}</h2>
          <div className="text-sm text-gray-500">{property.type}</div>
        </div>
        <p className="text-sm text-gray-600 mt-2">{property.location}</p>
        <p className="mt-2 font-medium">₹ {property.price.toLocaleString()}</p>
        <p className="text-sm text-gray-700 mt-2">{property.description?.slice(0, 100)}{property.description && property.description.length>100 ? '...' : ''}</p>
        <div className="mt-3 flex gap-2">
          <button onClick={onView} className="text-sm bg-indigo-600 text-white px-3 py-1 rounded">View</button>
        </div>
      </div>
    </div>
  )
}
