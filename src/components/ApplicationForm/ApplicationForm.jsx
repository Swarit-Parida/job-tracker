import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { STATUSES, PLATFORMS, LOCATIONS } from '../../utils/helpers'

const schema = yup.object({
  company: yup.string().required('Company name is required'),
  role: yup.string().required('Role is required'),
  appliedDate: yup.string().required('Applied date is required'),
  location: yup.string().required(),
  salary: yup.number().typeError('Must be a number').nullable().transform(v => (isNaN(v) ? null : v)),
  platform: yup.string().required(),
  status: yup.string().required(),
  interviewDate: yup.string(),
  notes: yup.string(),
  domain: yup.string(),
})

const fieldClass = "input-field"
const labelClass = "block text-text-secondary text-xs font-body font-medium mb-1.5"
const errorClass = "text-accent-red text-xs font-body mt-1"

export default function ApplicationForm({ defaultValues, onSubmit, submitLabel = 'Save Application' }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {
      status: 'Applied',
      platform: 'LinkedIn',
      location: 'Remote',
      appliedDate: new Date().toISOString().split('T')[0],
    }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Company */}
        <div>
          <label className={labelClass}>Company Name *</label>
          <input {...register('company')} className={fieldClass} placeholder="e.g. Google" />
          {errors.company && <p className={errorClass}>{errors.company.message}</p>}
        </div>

        {/* Role */}
        <div>
          <label className={labelClass}>Job Role *</label>
          <input {...register('role')} className={fieldClass} placeholder="e.g. Senior Frontend Engineer" />
          {errors.role && <p className={errorClass}>{errors.role.message}</p>}
        </div>

        {/* Domain */}
        <div>
          <label className={labelClass}>Company Domain <span className="text-text-muted">(for logo)</span></label>
          <input {...register('domain')} className={fieldClass} placeholder="e.g. google.com" />
        </div>

        {/* Platform */}
        <div>
          <label className={labelClass}>Platform</label>
          <select {...register('platform')} className={fieldClass}>
            {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className={labelClass}>Location Type</label>
          <select {...register('location')} className={fieldClass}>
            {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className={labelClass}>Status</label>
          <select {...register('status')} className={fieldClass}>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Salary */}
        <div>
          <label className={labelClass}>Salary (Annual, USD)</label>
          <input {...register('salary')} type="number" className={fieldClass} placeholder="e.g. 120000" />
          {errors.salary && <p className={errorClass}>{errors.salary.message}</p>}
        </div>

        {/* Applied Date */}
        <div>
          <label className={labelClass}>Applied Date *</label>
          <input {...register('appliedDate')} type="date" className={fieldClass} />
          {errors.appliedDate && <p className={errorClass}>{errors.appliedDate.message}</p>}
        </div>

        {/* Interview Date */}
        <div>
          <label className={labelClass}>Interview Date <span className="text-text-muted">(optional)</span></label>
          <input {...register('interviewDate')} type="date" className={fieldClass} />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className={labelClass}>Notes</label>
        <textarea
          {...register('notes')}
          rows={3}
          className={fieldClass + ' resize-none'}
          placeholder="Any notes about this application..."
        />
      </div>

      <div className="flex justify-end pt-2">
        <button type="submit" disabled={isSubmitting} className="btn-primary">
          {isSubmitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  )
}
