import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar/Navbar'
import Dashboard from './pages/Dashboard'
import Applications from './pages/Applications'
import AddApplication from './pages/AddApplication'
import EditApplication from './pages/EditApplication'
import Analytics from './pages/Analytics'

export default function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-bg-base">
      <Navbar />
      <main className="flex-1 overflow-y-auto relative z-10">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/applications/new" element={<AddApplication />} />
          <Route path="/applications/:id" element={<EditApplication />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </main>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="dark"
        toastStyle={{
          background: '#13162a',
          border: '1px solid #1f2440',
          color: '#e8eaf6',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '14px',
          borderRadius: '12px',
        }}
      />
    </div>
  )
}
