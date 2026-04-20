import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { RiAddLine, RiLayoutGridLine, RiListCheck } from 'react-icons/ri'
import { useApplications } from '../hooks/useApplications'
import PageHeader from '../components/PageHeader'
import SearchBar from '../components/SearchBar/SearchBar'
import Filters from '../components/Filters/Filters'
import JobCard from '../components/JobCard/JobCard'
import EmptyState from '../components/EmptyState'
import { STATUS_CONFIG, formatDate, formatSalary, getLogoUrl, getInitials } from '../utils/helpers'

const TABS = ['All', 'Applied', 'Interviewing', 'Offer', 'Rejected', 'Bookmarked']

export default function Applications() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') === 'bookmarked' ? 'Bookmarked' : 'All')
  const [viewMode, setViewMode] = useState('grid')
  const [imgErrors, setImgErrors] = useState({})

  const {
    filtered, bookmarked,
    searchQuery, setSearchQuery,
    statusFilter, setStatusFilter,
    platformFilter, setPlatformFilter,
    locationFilter, setLocationFilter,
    sortBy, setSortBy,
    sortOrder, setSortOrder,
  } = useApplications()

  const displayed = activeTab === 'Bookmarked'
    ? bookmarked
    : activeTab === 'All'
    ? filtered
    : filtered.filter(a => a.status === activeTab)

  const tabCount = (tab) => {
    if (tab === 'All') return filtered.length
    if (tab === 'Bookmarked') return bookmarked.length
    return filtered.filter(a => a.status === tab).length
  }

  return (
    <div className="px-8 py-7 animate-fade-in">
      <PageHeader
        title="Applications"
        action={
          <button onClick={() => navigate('/applications/new')} className="btn-primary flex items-center gap-1.5">
            <RiAddLine className="text-sm" /> Add Application
          </button>
        }
      />

      {/* Search + Filter bar */}
      <div className="glass-card p-4 mb-5 shadow-card space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <div className="flex items-center gap-1 ml-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg border transition-all ${viewMode === 'grid' ? 'bg-accent-violet/15 border-accent-violet/20 text-accent-violet' : 'bg-bg-elevated border-bg-border text-text-muted'}`}
            >
              <RiLayoutGridLine />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg border transition-all ${viewMode === 'list' ? 'bg-accent-violet/15 border-accent-violet/20 text-accent-violet' : 'bg-bg-elevated border-bg-border text-text-muted'}`}
            >
              <RiListCheck />
            </button>
          </div>
        </div>
        <Filters
          statusFilter={statusFilter} setStatusFilter={setStatusFilter}
          platformFilter={platformFilter} setPlatformFilter={setPlatformFilter}
          locationFilter={locationFilter} setLocationFilter={setLocationFilter}
          sortBy={sortBy} setSortBy={setSortBy}
          sortOrder={sortOrder} setSortOrder={setSortOrder}
        />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-5 overflow-x-auto pb-1">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-body font-medium whitespace-nowrap transition-all border
              ${activeTab === tab
                ? 'bg-accent-violet/15 border-accent-violet/20 text-accent-violet'
                : 'bg-bg-card border-bg-border text-text-secondary hover:text-text-primary hover:border-accent-violet/10'
              }`}
          >
            {tab}
            <span className={`px-1.5 py-0.5 rounded-md font-mono text-xs ${activeTab === tab ? 'bg-accent-violet/20 text-accent-violet' : 'bg-bg-elevated text-text-muted'}`}>
              {tabCount(tab)}
            </span>
          </button>
        ))}
      </div>

      {/* Results */}
      {displayed.length === 0 ? (
        <EmptyState message="No applications found" />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {displayed.map(app => <JobCard key={app.id} app={app} />)}
        </div>
      ) : (
        <div className="glass-card overflow-hidden shadow-card">
          <table className="w-full">
            <thead>
              <tr className="border-b border-bg-border">
                {['Company', 'Role', 'Status', 'Platform', 'Applied', 'Salary', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-text-muted text-xs font-body font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayed.map((app, i) => {
                const cfg = STATUS_CONFIG[app.status] || STATUS_CONFIG['Applied']
                return (
                  <tr key={app.id} className={`border-b border-bg-border hover:bg-bg-elevated/50 transition-all ${i % 2 === 0 ? '' : 'bg-bg-elevated/20'}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg overflow-hidden bg-bg-elevated border border-bg-border shrink-0 flex items-center justify-center">
                          {!imgErrors[app.id] && app.domain ? (
                            <img src={getLogoUrl(app.domain)} alt={app.company} className="w-full h-full object-contain p-0.5" onError={() => setImgErrors(prev => ({ ...prev, [app.id]: true }))} />
                          ) : (
                            <span className="text-text-muted text-xs font-display font-bold">{getInitials(app.company)}</span>
                          )}
                        </div>
                        <span className="text-text-primary text-sm font-body">{app.company}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-text-secondary text-sm font-body">{app.role}</td>
                    <td className="px-4 py-3">
                      <span className={`status-badge ${cfg.bg} ${cfg.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-text-muted text-xs font-body">{app.platform}</td>
                    <td className="px-4 py-3 text-text-muted text-xs font-body">{formatDate(app.appliedDate)}</td>
                    <td className="px-4 py-3 text-text-secondary text-xs font-mono">{formatSalary(app.salary)}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => navigate(`/applications/${app.id}`)}
                        className="text-accent-violet text-xs font-body hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
