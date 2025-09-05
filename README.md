# 🏡 Property Listing App

A modern, responsive **Property Listing Dashboard** built with **React + Vite + Tailwind CSS**.  
Backend powered by **json-server** for mock APIs.  

---

## ✨ Features
- 📋 List of properties with images, location, and details  
- 🔍 Search and filter by property type or name/location  
- ➕ Add new properties via a form  
- 🖼️ Modern UI with responsive grid layout  
- 📱 Fully responsive (desktop, tablet, mobile)  
- 🔗 Modal popup to view property details  

---

## 🛠️ Tech Stack
- **Frontend:** React, Vite, Tailwind CSS  
- **UI Icons:** [Lucide React](https://lucide.dev/)  
- **Backend:** json-server (mock REST API)  

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
cd property-listing-app
2️⃣ Install Dependencies
npm install
3️⃣ Start Mock Backend (json-server)
npx json-server --watch db.json --port 4000
➡️ API available at:

http://localhost:4000/properties

http://localhost:4000/api/properties
 → /properties

4️⃣ Start Frontend (Vite)
npm run dev
frontend/
│── src/
│   ├── components/
│   │   ├── PropertyCard.jsx      # Card UI for property
│   │   ├── PropertyModal.jsx     # Modal for details
│   │   └── AddPropertyForm.jsx   # Form to add new property
│   ├── App.jsx                   # Main app
│   └── main.jsx                  # React entry
│── db.json                       # Mock data
│── vite.config.js
│── package.json
│── tailwind.config.js
