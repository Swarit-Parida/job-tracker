import { useNavigate, useParams } from 'react-router-dom'
import { RiArrowLeftLine, RiDeleteBinLine } from 'react-icons/ri'
import { toast } from 'react-toastify'
import { useApplicationContext } from '../context/ApplicationContext'
import ApplicationForm from '../components/ApplicationForm/ApplicationForm'

export default function EditApplication() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { applications, updateApplication, deleteApplication } = useApplicationContext()
  const app = applications.find(a => a.id === id)

  if (!app) {
    return (
      <div className="px-8 py-7 text-center">
        <p className="text-text-muted font-body">Application not found.</p>
        <button onClick={() => navigate('/applications')} className="btn-primary mt-4">Back</button>
      </div>
    )
  }

  const handleSubmit = (data) => {
    updateApplication({ ...app, ...data })
    toast.success('Application updated!')
    navigate('/applications')
  }

  const handleDelete = () => {
    deleteApplication(app.id)
    toast.success('Application deleted')
    navigate('/applications')
  }

  return (
    <div className="px-8 py-7 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-xl bg-bg-card border border-bg-border flex items-center justify-center text-text-muted hover:text-text-primary transition-all"
          >
            <RiArrowLeftLine />
          </button>
          <div>
            <h1 className="font-display font-bold text-text-primary text-2xl">Edit Application</h1>
            <p className="text-text-muted text-xs font-body mt-0.5">{app.company} — {app.role}</p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-red/10 border border-accent-red/20 text-accent-red text-sm font-body hover:bg-accent-red/20 transition-all"
        >
          <RiDeleteBinLine /> Delete
        </button>
      </div>

      <div className="max-w-2xl">
        <div className="glass-card p-6 shadow-card">
          <ApplicationForm defaultValues={app} onSubmit={handleSubmit} submitLabel="Update Application" />
        </div>
      </div>
    </div>
  )
}
