import React from 'react'

export default function PropertyModal({ property, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full overflow-hidden shadow-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold">{property.name}</h3>
          <button onClick={onClose} className="text-gray-600">Close</button>
        </div>
        <div className="p-4 grid md:grid-cols-2 gap-4">
          <div>
            <img src={property.image || `https://via.placeholder.com/800x500?text=${encodeURIComponent(property.name)}`} alt={property.name} className="w-full h-64 object-cover rounded" />
            <p className="mt-3 text-gray-700">{property.description}</p>
          </div>
          <div>
            <div className="text-sm text-gray-600">Type</div>
            <div className="font-medium mb-3">{property.type}</div>

            <div className="text-sm text-gray-600">Location</div>
            <div className="font-medium mb-3">{property.location}</div>

            <div className="text-sm text-gray-600">Price</div>
            <div className="font-medium mb-3">₹ {property.price.toLocaleString()}</div>

            {property.coords && (
              <div className="mt-4">
                <div className="text-sm text-gray-600">Map</div>
                <div className="mt-2">
                  <iframe
                    title="map"
                    width="100%"
                    height="200"
                    loading="lazy"
                    src={`https://www.google.com/maps?q=${property.coords.lat},${property.coords.lng}&output=embed`}
                    className="rounded"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
