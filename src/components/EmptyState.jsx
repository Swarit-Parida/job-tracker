import { RiBriefcase2Line } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

export default function EmptyState({ message = 'No applications found', showAdd = true }) {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-bg-elevated border border-bg-border flex items-center justify-center mb-4">
        <RiBriefcase2Line className="text-2xl text-text-muted" />
      </div>
      <p className="text-text-secondary font-body text-sm mb-1">{message}</p>
      <p className="text-text-muted font-body text-xs mb-4">Your applications will appear here</p>
      {showAdd && (
        <button onClick={() => navigate('/applications/new')} className="btn-primary">
          + Add Application
        </button>
      )}
    </div>
  )
}
