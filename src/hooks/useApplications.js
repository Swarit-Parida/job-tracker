import { useState, useMemo } from 'react'
import { useApplicationContext } from '../context/ApplicationContext'
import { useDebounce } from './useDebounce'

export function useApplications() {
  const { applications, addApplication, updateApplication, deleteApplication, toggleBookmark } = useApplicationContext()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [platformFilter, setPlatformFilter] = useState('All')
  const [locationFilter, setLocationFilter] = useState('All')
  const [sortBy, setSortBy] = useState('appliedDate')
  const [sortOrder, setSortOrder] = useState('desc')

  const debouncedSearch = useDebounce(searchQuery, 400)

  const filtered = useMemo(() => {
    let result = [...applications]

    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase()
      result = result.filter(a =>
        a.company.toLowerCase().includes(q) ||
        a.role.toLowerCase().includes(q)
      )
    }

    if (statusFilter !== 'All') result = result.filter(a => a.status === statusFilter)
    if (platformFilter !== 'All') result = result.filter(a => a.platform === platformFilter)
    if (locationFilter !== 'All') result = result.filter(a => a.location === locationFilter)

    result.sort((a, b) => {
      let valA = a[sortBy], valB = b[sortBy]
      if (sortBy === 'appliedDate') {
        valA = new Date(valA); valB = new Date(valB)
      }
      if (sortBy === 'salary') {
        valA = Number(valA); valB = Number(valB)
      }
      if (sortBy === 'company') {
        valA = valA.toLowerCase(); valB = valB.toLowerCase()
      }
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    return result
  }, [applications, debouncedSearch, statusFilter, platformFilter, locationFilter, sortBy, sortOrder])

  const bookmarked = useMemo(() => applications.filter(a => a.bookmarked), [applications])

  return {
    applications,
    filtered,
    bookmarked,
    searchQuery, setSearchQuery,
    statusFilter, setStatusFilter,
    platformFilter, setPlatformFilter,
    locationFilter, setLocationFilter,
    sortBy, setSortBy,
    sortOrder, setSortOrder,
    addApplication, updateApplication, deleteApplication, toggleBookmark,
  }
}
