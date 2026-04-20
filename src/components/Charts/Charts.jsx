import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts'
import { useApplicationContext } from '../../context/ApplicationContext'
import { STATUSES } from '../../utils/helpers'
import { format, parseISO, startOfMonth } from 'date-fns'

const COLORS = ['#22d3ee', '#7c6ff7', '#4ade80', '#f87171']

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-bg-elevated border border-bg-border rounded-xl px-3 py-2 text-xs font-body shadow-card">
        <p className="text-text-primary font-medium">{payload[0].name}</p>
        <p className="text-text-secondary">{payload[0].value}</p>
      </div>
    )
  }
  return null
}

export function PipelinePieChart() {
  const { applications } = useApplicationContext()
  const data = STATUSES.map(s => ({
    name: s,
    value: applications.filter(a => a.status === s).length
  })).filter(d => d.value > 0)

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="transparent" />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 12, fontFamily: 'DM Sans', color: '#8b92b8', paddingTop: 12 }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function MonthlyBarChart() {
  const { applications } = useApplicationContext()

  const monthMap = {}
  applications.forEach(app => {
    if (!app.appliedDate) return
    const month = format(parseISO(app.appliedDate), 'MMM yyyy')
    monthMap[month] = (monthMap[month] || 0) + 1
  })

  const data = Object.entries(monthMap)
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
    .map(([month, count]) => ({ month, count }))

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} barSize={28}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1f2440" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fill: '#8b92b8', fontSize: 11, fontFamily: 'DM Sans' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#8b92b8', fontSize: 11, fontFamily: 'DM Sans' }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="count" name="Applications" fill="#7c6ff7" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
