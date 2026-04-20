import { NavLink, useLocation } from 'react-router-dom'
import {
  RiDashboardLine, RiBriefcase2Line, RiBarChartLine,
  RiAddCircleLine, RiBookmarkLine, RiSettings4Line,
  RiNotification3Line, RiSearchLine
} from 'react-icons/ri'
import { useApplicationContext } from '../../context/ApplicationContext'

const navItems = [
  { to: '/dashboard', icon: RiDashboardLine, label: 'Dashboard' },
  { to: '/applications', icon: RiBriefcase2Line, label: 'Applications' },
  { to: '/analytics', icon: RiBarChartLine, label: 'Analytics' },
]

export default function Navbar() {
  const { applications } = useApplicationContext()
  const bookmarked = applications.filter(a => a.bookmarked).length
  const location = useLocation()

  return (
    <aside className="w-60 h-screen flex flex-col bg-bg-card border-r border-bg-border shrink-0 z-20">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-bg-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-violet flex items-center justify-center shadow-glow-violet">
            <RiBriefcase2Line className="text-white text-base" />
          </div>
          <span className="font-display font-bold text-text-primary text-lg tracking-tight">JobTrackr</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-text-muted text-xs font-body font-medium uppercase tracking-widest px-3 mb-3">Main</p>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body transition-all duration-200 cursor-pointer group
              ${isActive
                ? 'bg-accent-violet/15 text-accent-violet border border-accent-violet/20'
                : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary border border-transparent'
              }`
            }
          >
            <Icon className="text-base shrink-0" />
            <span>{label}</span>
          </NavLink>
        ))}

        <div className="pt-4">
          <p className="text-text-muted text-xs font-body font-medium uppercase tracking-widest px-3 mb-3">Quick Actions</p>
          <NavLink
            to="/applications/new"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body transition-all duration-200 cursor-pointer
              ${isActive
                ? 'bg-accent-violet/15 text-accent-violet border border-accent-violet/20'
                : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary border border-transparent'
              }`
            }
          >
            <RiAddCircleLine className="text-base shrink-0" />
            <span>Add Application</span>
          </NavLink>
          <NavLink
            to="/applications?tab=bookmarked"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body text-text-secondary hover:bg-bg-elevated hover:text-text-primary transition-all duration-200 border border-transparent"
          >
            <RiBookmarkLine className="text-base shrink-0" />
            <span>Bookmarked</span>
            {bookmarked > 0 && (
              <span className="ml-auto bg-accent-violet/20 text-accent-violet text-xs font-mono px-1.5 py-0.5 rounded-md">
                {bookmarked}
              </span>
            )}
          </NavLink>
        </div>
      </nav>

      {/* Stats summary */}
      <div className="px-3 py-3 border-t border-bg-border">
        <div className="bg-bg-elevated rounded-xl px-3 py-3">
          <p className="text-text-muted text-xs font-body mb-2">Total Applications</p>
          <div className="flex items-end justify-between">
            <span className="font-display font-bold text-2xl text-text-primary">{applications.length}</span>
            <span className="text-accent-green text-xs font-body">Active</span>
          </div>
          <div className="mt-2 h-1 bg-bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-violet rounded-full transition-all duration-700"
              style={{ width: `${Math.min((applications.filter(a => a.status === 'Interviewing').length / applications.length) * 100, 100)}%` }}
            />
          </div>
          <p className="text-text-muted text-xs font-body mt-1">
            {applications.filter(a => a.status === 'Interviewing').length} interviewing
          </p>
        </div>
      </div>

      {/* User */}
      <div className="px-4 py-4 border-t border-bg-border flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-pink flex items-center justify-center shrink-0">
          <span className="text-white text-xs font-display font-bold">JD</span>
        </div>
        <div className="min-w-0">
          <p className="text-text-primary text-sm font-body font-medium truncate">John Doe</p>
          <p className="text-text-muted text-xs font-body truncate">Job Seeker</p>
        </div>
        <button className="ml-auto text-text-muted hover:text-text-primary transition-colors">
          <RiSettings4Line className="text-base" />
        </button>
      </div>
    </aside>
  )
}
