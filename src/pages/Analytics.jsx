import { useMemo } from 'react'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts'
import { format, parseISO } from 'date-fns'
import { useApplicationContext } from '../context/ApplicationContext'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import { PipelinePieChart, MonthlyBarChart } from '../components/Charts/Charts'
import { STATUSES, PLATFORMS, formatSalary } from '../utils/helpers'
import {
  RiBriefcase2Line, RiCalendarCheckLine, RiTrophyLine,
  RiCloseLine, RiPercentLine, RiTimeLine
} from 'react-icons/ri'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-bg-elevated border border-bg-border rounded-xl px-3 py-2 text-xs font-body shadow-card">
        <p className="text-text-primary font-medium mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }}>{p.name}: {p.value}</p>
        ))}
      </div>
    )
  }
  return null
}

export default function Analytics() {
  const { applications } = useApplicationContext()

  const total = applications.length
  const offers = applications.filter(a => a.status === 'Offer').length
  const interviewing = applications.filter(a => a.status === 'Interviewing').length
  const rejected = applications.filter(a => a.status === 'Rejected').length
  const successRate = total ? Math.round((offers / total) * 100) : 0
  const interviewRate = total ? Math.round(((interviewing + offers) / total) * 100) : 0

  const avgSalary = useMemo(() => {
    const withSalary = applications.filter(a => a.salary > 0)
    if (!withSalary.length) return 0
    return Math.round(withSalary.reduce((sum, a) => sum + Number(a.salary), 0) / withSalary.length)
  }, [applications])

  const platformData = useMemo(() =>
    PLATFORMS.map(p => ({
      platform: p,
      count: applications.filter(a => a.platform === p).length,
    })).filter(d => d.count > 0),
    [applications]
  )

  const radarData = useMemo(() =>
    STATUSES.map(s => ({
      status: s,
      count: applications.filter(a => a.status === s).length,
    })),
    [applications]
  )

  // Timeline: applications per week
  const timelineData = useMemo(() => {
    const weekMap = {}
    applications.forEach(app => {
      if (!app.appliedDate) return
      const week = format(parseISO(app.appliedDate), 'MM/dd')
      weekMap[week] = (weekMap[week] || 0) + 1
    })
    return Object.entries(weekMap)
      .sort((a, b) => new Date(a[0]) - new Date(b[0]))
      .slice(-8)
      .map(([week, count]) => ({ week, count }))
  }, [applications])

  const stats = [
    { label: 'Total Applications', value: total, icon: RiBriefcase2Line, color: 'bg-accent-violet/15 text-accent-violet' },
    { label: 'Success Rate', value: `${successRate}%`, icon: RiPercentLine, color: 'bg-accent-green/15 text-accent-green', sub: 'Offer / Total' },
    { label: 'Interview Rate', value: `${interviewRate}%`, icon: RiCalendarCheckLine, color: 'bg-accent-cyan/15 text-accent-cyan', sub: 'Interview + Offer / Total' },
    { label: 'Avg. Salary', value: formatSalary(avgSalary), icon: RiTimeLine, color: 'bg-accent-amber/15 text-accent-amber', sub: 'From tracked apps' },
  ]

  return (
    <div className="px-8 py-7 animate-fade-in">
      <PageHeader title="Analytics" />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        {/* Pipeline pie */}
        <div className="glass-card p-5 shadow-card">
          <h2 className="font-display font-semibold text-text-primary text-base mb-4">Application Pipeline</h2>
          <PipelinePieChart />
        </div>

        {/* Radar chart */}
        <div className="glass-card p-5 shadow-card">
          <h2 className="font-display font-semibold text-text-primary text-base mb-4">Status Distribution</h2>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#1f2440" />
              <PolarAngleAxis dataKey="status" tick={{ fill: '#8b92b8', fontSize: 11, fontFamily: 'DM Sans' }} />
              <PolarRadiusAxis tick={{ fill: '#8b92b8', fontSize: 9 }} axisLine={false} />
              <Radar name="Applications" dataKey="count" stroke="#7c6ff7" fill="#7c6ff7" fillOpacity={0.2} />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        {/* Monthly bar */}
        <div className="glass-card p-5 shadow-card">
          <h2 className="font-display font-semibold text-text-primary text-base mb-4">Monthly Applications</h2>
          <MonthlyBarChart />
        </div>

        {/* Area timeline */}
        <div className="glass-card p-5 shadow-card">
          <h2 className="font-display font-semibold text-text-primary text-base mb-4">Application Timeline</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={timelineData}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c6ff7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7c6ff7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2440" vertical={false} />
              <XAxis dataKey="week" tick={{ fill: '#8b92b8', fontSize: 11, fontFamily: 'DM Sans' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8b92b8', fontSize: 11, fontFamily: 'DM Sans' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="count" name="Applications" stroke="#7c6ff7" fill="url(#areaGrad)" strokeWidth={2} dot={{ fill: '#7c6ff7', strokeWidth: 0, r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Platform breakdown */}
      <div className="glass-card p-5 shadow-card">
        <h2 className="font-display font-semibold text-text-primary text-base mb-4">Platform Breakdown</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {platformData.map(({ platform, count }) => (
            <div key={platform} className="bg-bg-elevated rounded-xl p-3 border border-bg-border text-center">
              <p className="font-display font-bold text-2xl text-accent-violet mb-1">{count}</p>
              <p className="text-text-muted text-xs font-body">{platform}</p>
              <div className="mt-2 h-1 bg-bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-violet rounded-full"
                  style={{ width: `${Math.round((count / total) * 100)}%` }}
                />
              </div>
              <p className="text-text-muted text-xs font-mono mt-1">{Math.round((count / total) * 100)}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
