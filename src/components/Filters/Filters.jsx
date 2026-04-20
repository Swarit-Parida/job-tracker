import { RiFilterLine, RiArrowUpDownLine } from 'react-icons/ri'
import { STATUSES, PLATFORMS, LOCATIONS } from '../../utils/helpers'

export default function Filters({
  statusFilter, setStatusFilter,
  platformFilter, setPlatformFilter,
  locationFilter, setLocationFilter,
  sortBy, setSortBy,
  sortOrder, setSortOrder,
}) {
  const selectClass = "input-field text-xs py-2 cursor-pointer"

  return (
    <div className="flex flex-wrap items-center gap-2">
      <RiFilterLine className="text-text-muted text-sm shrink-0" />

      <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className={selectClass} style={{ width: 130 }}>
        <option value="All">All Statuses</option>
        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      <select value={platformFilter} onChange={e => setPlatformFilter(e.target.value)} className={selectClass} style={{ width: 145 }}>
        <option value="All">All Platforms</option>
        {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
      </select>

      <select value={locationFilter} onChange={e => setLocationFilter(e.target.value)} className={selectClass} style={{ width: 130 }}>
        <option value="All">All Locations</option>
        {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
      </select>

      <div className="flex items-center gap-1 ml-auto">
        <RiArrowUpDownLine className="text-text-muted text-sm" />
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className={selectClass} style={{ width: 140 }}>
          <option value="appliedDate">Date Applied</option>
          <option value="salary">Salary</option>
          <option value="company">Company</option>
        </select>
        <button
          onClick={() => setSortOrder(o => o === 'asc' ? 'desc' : 'asc')}
          className="btn-ghost py-2 px-3 text-xs"
        >
          {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
        </button>
      </div>
    </div>
  )
}
