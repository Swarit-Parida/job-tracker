export default function StatCard({ label, value, icon: Icon, color, sub }) {
  return (
    <div className="glass-card p-5 flex items-start gap-4 shadow-card hover:border-opacity-50 transition-all duration-300">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon className="text-xl" />
      </div>
      <div>
        <p className="text-text-muted text-xs font-body mb-1">{label}</p>
        <p className="text-text-primary font-display font-bold text-2xl">{value}</p>
        {sub && <p className="text-text-muted text-xs font-body mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}
