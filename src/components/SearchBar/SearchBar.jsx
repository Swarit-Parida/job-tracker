import { RiSearchLine, RiCloseLine } from 'react-icons/ri'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative flex-1 max-w-sm">
      <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search companies, roles..."
        className="input-field pl-9 pr-8"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
        >
          <RiCloseLine className="text-sm" />
        </button>
      )}
    </div>
  )
}
