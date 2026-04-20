export const STATUS_CONFIG = {
  Applied:      { color: 'text-accent-cyan',   bg: 'bg-accent-cyan/10',   dot: 'bg-accent-cyan' },
  Interviewing: { color: 'text-accent-violet', bg: 'bg-accent-violet/10', dot: 'bg-accent-violet' },
  Offer:        { color: 'text-accent-green',  bg: 'bg-accent-green/10',  dot: 'bg-accent-green' },
  Rejected:     { color: 'text-accent-red',    bg: 'bg-accent-red/10',    dot: 'bg-accent-red' },
}

export const STATUSES = ['Applied', 'Interviewing', 'Offer', 'Rejected']
export const PLATFORMS = ['LinkedIn', 'Company Website', 'Referral', 'Job Board', 'AngelList', 'Indeed', 'Other']
export const LOCATIONS = ['Remote', 'Hybrid', 'On-site']

export function formatSalary(val) {
  if (!val) return '—'
  return '$' + Number(val).toLocaleString()
}

export function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function getLogoUrl(domain) {
  if (!domain) return null
  return `https://logo.clearbit.com/${domain}`
}

export function getInitials(name) {
  return name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '??'
}
