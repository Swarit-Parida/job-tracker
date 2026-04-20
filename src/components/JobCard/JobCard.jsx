import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RiBookmarkLine, RiBookmarkFill, RiDeleteBinLine, RiEditLine, RiMapPinLine, RiMoneyDollarCircleLine } from 'react-icons/ri'
import { STATUS_CONFIG, formatSalary, formatDate, getLogoUrl, getInitials } from '../../utils/helpers'
import { useApplicationContext } from '../../context/ApplicationContext'
import { toast } from 'react-toastify'

export default function JobCard({ app }) {
  const { deleteApplication, toggleBookmark } = useApplicationContext()
  const navigate = useNavigate()
  const [imgError, setImgError] = useState(false)
  const cfg = STATUS_CONFIG[app.status] || STATUS_CONFIG['Applied']

  const handleDelete = () => {
    deleteApplication(app.id)
    toast.success('Application deleted')
  }

  const handleBookmark = () => {
    toggleBookmark(app.id)
    toast.success(app.bookmarked ? 'Removed from bookmarks' : 'Added to bookmarks')
  }

  return (
    <div className="glass-card p-4 hover:border-accent-violet/30 transition-all duration-300 group animate-slide-up shadow-card">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-bg-elevated border border-bg-border shrink-0 flex items-center justify-center">
            {!imgError && app.domain ? (
              <img
                src={getLogoUrl(app.domain)}
                alt={app.company}
                className="w-full h-full object-contain p-1"
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="text-text-secondary text-xs font-display font-bold">{getInitials(app.company)}</span>
            )}
          </div>
          <div className="min-w-0">
            <h3 className="text-text-primary font-display font-semibold text-sm truncate">{app.company}</h3>
            <p className="text-text-secondary text-xs font-body truncate">{app.role}</p>
          </div>
        </div>
        <span className={`status-badge ${cfg.bg} ${cfg.color} shrink-0`}>
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
          {app.status}
        </span>
      </div>

      {/* Details */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="flex items-center gap-1 text-text-muted text-xs font-body">
          <RiMapPinLine className="text-xs" /> {app.location}
        </span>
        {app.salary && (
          <span className="flex items-center gap-1 text-text-muted text-xs font-body">
            <RiMoneyDollarCircleLine className="text-xs" /> {formatSalary(app.salary)}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-xs font-body text-text-muted mb-3">
        <span>Applied {formatDate(app.appliedDate)}</span>
        <span className="bg-bg-elevated px-2 py-0.5 rounded-lg border border-bg-border">{app.platform}</span>
      </div>

      {app.notes && (
        <p className="text-text-muted text-xs font-body line-clamp-2 mb-3 bg-bg-elevated rounded-lg px-3 py-2 border border-bg-border">
          {app.notes}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-bg-border">
        <button
          onClick={() => navigate(`/applications/${app.id}`)}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-bg-elevated hover:bg-accent-violet/10 hover:text-accent-violet text-text-secondary text-xs font-body transition-all border border-bg-border hover:border-accent-violet/20"
        >
          <RiEditLine /> Edit
        </button>
        <button
          onClick={handleBookmark}
          className={`p-1.5 rounded-lg border transition-all ${app.bookmarked ? 'bg-accent-amber/10 border-accent-amber/20 text-accent-amber' : 'bg-bg-elevated border-bg-border text-text-muted hover:text-accent-amber'}`}
        >
          {app.bookmarked ? <RiBookmarkFill /> : <RiBookmarkLine />}
        </button>
        <button
          onClick={handleDelete}
          className="p-1.5 rounded-lg bg-bg-elevated border border-bg-border text-text-muted hover:bg-accent-red/10 hover:text-accent-red hover:border-accent-red/20 transition-all"
        >
          <RiDeleteBinLine />
        </button>
      </div>
    </div>
  )
}
