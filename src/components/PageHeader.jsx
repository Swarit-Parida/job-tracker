import { RiNotification3Line, RiSearchLine } from 'react-icons/ri'

export default function PageHeader({ title, subtitle, action }) {
  const now = new Date()
  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        {subtitle ? (
          <>
            <p className="text-text-muted text-sm font-body mb-0.5">{greeting}, John 👋</p>
            <h1 className="text-text-primary font-display font-bold text-2xl">{title}</h1>
          </>
        ) : (
          <h1 className="text-text-primary font-display font-bold text-2xl">{title}</h1>
        )}
      </div>
      <div className="flex items-center gap-3">
        {action}
        <button className="w-9 h-9 rounded-xl bg-bg-card border border-bg-border flex items-center justify-center text-text-muted hover:text-text-primary hover:border-accent-violet/30 transition-all">
          <RiNotification3Line className="text-base" />
        </button>
      </div>
    </div>
  )
}
