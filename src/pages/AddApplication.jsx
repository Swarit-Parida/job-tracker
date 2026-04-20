import { useNavigate } from 'react-router-dom'
import { RiArrowLeftLine } from 'react-icons/ri'
import { toast } from 'react-toastify'
import { useApplicationContext } from '../context/ApplicationContext'
import ApplicationForm from '../components/ApplicationForm/ApplicationForm'
import PageHeader from '../components/PageHeader'

export default function AddApplication() {
  const { addApplication } = useApplicationContext()
  const navigate = useNavigate()

  const handleSubmit = (data) => {
    addApplication(data)
    toast.success('Application added!')
    navigate('/applications')
  }

  return (
    <div className="px-8 py-7 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-xl bg-bg-card border border-bg-border flex items-center justify-center text-text-muted hover:text-text-primary transition-all"
        >
          <RiArrowLeftLine />
        </button>
        <div>
          <h1 className="font-display font-bold text-text-primary text-2xl">Add Application</h1>
          <p className="text-text-muted text-xs font-body mt-0.5">Track a new job opportunity</p>
        </div>
      </div>

      <div className="max-w-2xl">
        <div className="glass-card p-6 shadow-card">
          <ApplicationForm onSubmit={handleSubmit} submitLabel="Add Application" />
        </div>
      </div>
    </div>
  )
}
