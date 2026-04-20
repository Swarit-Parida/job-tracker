import { useNavigate } from 'react-router-dom'
import {
  RiBriefcase2Line, RiCalendarCheckLine, RiTrophyLine,
  RiCloseLine, RiBookmarkLine, RiArrowRightLine
} from 'react-icons/ri'
import { useApplicationContext } from '../context/ApplicationContext'
import { useApplications } from '../hooks/useApplications'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import { PipelinePieChart, MonthlyBarChart } from '../components/Charts/Charts'
import { STATUS_CONFIG, formatDate, getLogoUrl, getInitials } from '../utils/helpers'
import { useState } from 'react'

export default function Dashboard() {
  const { applications } = useApplicationContext()
  const navigate = useNavigate()
  const [imgErrors, setImgErrors] = useState({})

  const total = applications.length
  const interviewing = applications.filter(a => a.status === 'Interviewing').length
  const offers = applications.filter(a => a.status === 'Offer').length
  const rejected = applications.filter(a => a.status === 'Rejected').length
  const bookmarked = applications.filter(a => a.bookmarked)

  const upcoming = applications
    .filter(a => a.interviewDate && new Date(a.interviewDate) >= new Date())
    .sort((a, b) => new Date(a.interviewDate) - new Date(b.interviewDate))
    .slice(0, 3)

  const recent = [...applications]
    .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
    .slice(0, 4)

  const stats = [
    { label: 'Total Applications', value: total, icon: RiBriefcase2Line, color: 'bg-accent-violet/15 text-accent-violet', sub: 'All time' },
    { label: 'Interviews Scheduled', value: interviewing, icon: RiCalendarCheckLine, color: 'bg-accent-cyan/15 text-accent-cyan', sub: 'In progress' },
    { label: 'Offers Received', value: offers, icon: RiTrophyLine, color: 'bg-accent-green/15 text-accent-green', sub: 'Congratulations!' },
    { label: 'Rejected', value: rejected, icon: RiCloseLine, color: 'bg-accent-red/15 text-accent-red', sub: 'Keep going!' },
  ]

  return (
    <div className="px-8 py-7 animate-fade-in">
      <PageHeader title="Dashboard" subtitle />

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Pipeline pie */}
        <div className="glass-card p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-text-primary text-base">Pipeline Overview</h2>
          </div>
          <PipelinePieChart />
        </div>

        {/* Monthly bar */}
        <div className="glass-card p-5 shadow-card xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-text-primary text-base">Monthly Applications</h2>
          </div>
          <MonthlyBarChart />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <div className="glass-card p-5 shadow-card xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-text-primary text-base">Recent Applications</h2>
            <button
              onClick={() => navigate('/applications')}
              className="text-accent-violet text-xs font-body flex items-center gap-1 hover:underline"
            >
              View all <RiArrowRightLine />
            </button>
          </div>
          <div className="space-y-2">
            {recent.map(app => {
              const cfg = STATUS_CONFIG[app.status] || STATUS_CONFIG['Applied']
              return (
                <div
                  key={app.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-bg-elevated hover:bg-bg-border/50 transition-all cursor-pointer border border-transparent hover:border-bg-border"
                  onClick={() => navigate(`/applications/${app.id}`)}
                >
                  <div className="w-9 h-9 rounded-xl overflow-hidden bg-bg-card border border-bg-border shrink-0 flex items-center justify-center">
                    {!imgErrors[app.id] && app.domain ? (
                      <img
                        src={getLogoUrl(app.domain)}
                        alt={app.company}
                        className="w-full h-full object-contain p-1"
                        onError={() => setImgErrors(prev => ({ ...prev, [app.id]: true }))}
                      />
                    ) : (
                      <span className="text-text-secondary text-xs font-display font-bold">{getInitials(app.company)}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-text-primary text-sm font-body font-medium truncate">{app.company}</p>
                    <p className="text-text-muted text-xs font-body truncate">{app.role}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`status-badge ${cfg.bg} ${cfg.color} text-xs`}>{app.status}</span>
                    <p className="text-text-muted text-xs font-body mt-1">{formatDate(app.appliedDate)}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Upcoming interviews */}
          <div className="glass-card p-5 shadow-card">
            <h2 className="font-display font-semibold text-text-primary text-base mb-4">Upcoming Interviews</h2>
            {upcoming.length === 0 ? (
              <p className="text-text-muted text-xs font-body text-center py-4">No upcoming interviews</p>
            ) : (
              <div className="space-y-3">
                {upcoming.map(app => (
                  <div key={app.id} className="flex items-center gap-3 p-3 bg-bg-elevated rounded-xl border border-accent-violet/10">
                    <div className="w-2 h-2 rounded-full bg-accent-violet shrink-0 animate-pulse-slow" />
                    <div className="min-w-0">
                      <p className="text-text-primary text-xs font-body font-medium truncate">{app.company}</p>
                      <p className="text-text-muted text-xs font-body">{formatDate(app.interviewDate)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bookmarked */}
          <div className="glass-card p-5 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <RiBookmarkLine className="text-accent-amber" />
              <h2 className="font-display font-semibold text-text-primary text-base">Bookmarked</h2>
            </div>
            {bookmarked.length === 0 ? (
              <p className="text-text-muted text-xs font-body text-center py-4">No bookmarks yet</p>
            ) : (
              <div className="space-y-2">
                {bookmarked.slice(0, 4).map(app => (
                  <div
                    key={app.id}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-bg-elevated cursor-pointer transition-all"
                    onClick={() => navigate(`/applications/${app.id}`)}
                  >
                    <RiBookmarkLine className="text-accent-amber text-xs shrink-0" />
                    <div className="min-w-0">
                      <p className="text-text-primary text-xs font-body truncate">{app.company}</p>
                      <p className="text-text-muted text-xs font-body truncate">{app.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
