import { createContext, useContext, useReducer, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const ApplicationContext = createContext(null)

const initialApplications = [
  {
    id: '1',
    company: 'Google',
    role: 'Senior Frontend Engineer',
    location: 'Remote',
    salary: 180000,
    platform: 'LinkedIn',
    status: 'Interviewing',
    appliedDate: '2024-03-01',
    interviewDate: '2024-03-20',
    notes: 'Referred by John. Great culture fit.',
    bookmarked: true,
    domain: 'google.com',
  },
  {
    id: '2',
    company: 'Stripe',
    role: 'React Developer',
    location: 'San Francisco, CA',
    salary: 165000,
    platform: 'Company Website',
    status: 'Applied',
    appliedDate: '2024-03-05',
    interviewDate: '',
    notes: 'Applied via careers page. Waiting for response.',
    bookmarked: false,
    domain: 'stripe.com',
  },
  {
    id: '3',
    company: 'Netflix',
    role: 'UI Engineer',
    location: 'Hybrid',
    salary: 200000,
    platform: 'Referral',
    status: 'Offer',
    appliedDate: '2024-02-15',
    interviewDate: '2024-03-01',
    notes: 'Offer received! Negotiating salary.',
    bookmarked: true,
    domain: 'netflix.com',
  },
  {
    id: '4',
    company: 'Meta',
    role: 'Software Engineer',
    location: 'Menlo Park, CA',
    salary: 195000,
    platform: 'LinkedIn',
    status: 'Rejected',
    appliedDate: '2024-02-10',
    interviewDate: '2024-02-25',
    notes: 'Got to final round. Rejected on system design.',
    bookmarked: false,
    domain: 'meta.com',
  },
  {
    id: '5',
    company: 'Vercel',
    role: 'Frontend Engineer',
    location: 'Remote',
    salary: 145000,
    platform: 'Job Board',
    status: 'Applied',
    appliedDate: '2024-03-10',
    interviewDate: '',
    notes: 'Dream company. Strong portfolio submitted.',
    bookmarked: true,
    domain: 'vercel.com',
  },
  {
    id: '6',
    company: 'Shopify',
    role: 'Full Stack Developer',
    location: 'Remote',
    salary: 155000,
    platform: 'LinkedIn',
    status: 'Interviewing',
    appliedDate: '2024-03-08',
    interviewDate: '2024-03-22',
    notes: 'First round cleared. Technical round this week.',
    bookmarked: false,
    domain: 'shopify.com',
  },
]

function reducer(state, action) {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'ADD':
      return [action.payload, ...state]
    case 'UPDATE':
      return state.map(a => a.id === action.payload.id ? action.payload : a)
    case 'DELETE':
      return state.filter(a => a.id !== action.payload)
    case 'TOGGLE_BOOKMARK':
      return state.map(a => a.id === action.payload ? { ...a, bookmarked: !a.bookmarked } : a)
    default:
      return state
  }
}

export function ApplicationProvider({ children }) {
  const [stored, setStored] = useLocalStorage('job-tracker-apps', initialApplications)
  const [applications, dispatch] = useReducer(reducer, stored)

  useEffect(() => {
    setStored(applications)
  }, [applications])

  const addApplication = (app) => dispatch({ type: 'ADD', payload: { ...app, id: Date.now().toString() } })
  const updateApplication = (app) => dispatch({ type: 'UPDATE', payload: app })
  const deleteApplication = (id) => dispatch({ type: 'DELETE', payload: id })
  const toggleBookmark = (id) => dispatch({ type: 'TOGGLE_BOOKMARK', payload: id })

  return (
    <ApplicationContext.Provider value={{ applications, addApplication, updateApplication, deleteApplication, toggleBookmark }}>
      {children}
    </ApplicationContext.Provider>
  )
}

export function useApplicationContext() {
  const ctx = useContext(ApplicationContext)
  if (!ctx) throw new Error('useApplicationContext must be inside ApplicationProvider')
  return ctx
}
