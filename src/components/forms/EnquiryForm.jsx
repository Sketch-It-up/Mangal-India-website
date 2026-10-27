import { useId, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertCircle, ArrowRight, Check, CheckCircle2, Loader2 } from 'lucide-react'
import { cn } from '@/lib/cn'
import { submitEnquiry } from '@/lib/enquiry'
import { formCopy, forms, validateEnquiry } from '@/data/forms'

const inputClasses = (invalid) =>
  cn(
    'block w-full rounded-xl border bg-white px-4 text-[15px] text-ink shadow-sm transition placeholder:text-ink-muted/60',
    'focus:outline-none focus:ring-4',
    invalid ? 'border-pomegranate focus:border-pomegranate focus:ring-pomegranate/15' : 'border-forest/15 focus:border-leaf-dark focus:ring-leaf/25',
  )

const emptyValues = (form, initial) => ({
  ...Object.fromEntries(form.fields.map((f) => [f.name, f.type === 'checkboxes' ? [] : ''])),
  consent: false,
  ...initial,
})

function Field({ field, value, error, onChange, uid }) {
  const id = `${uid}-${field.name}`
  const errorId = `${id}-error`
  const describedBy = error ? errorId : undefined
  const label = (
    <>
      {field.label}
      {field.required ? (
        <span className="text-pomegranate" aria-hidden="true">
          {' '}*
        </span>
      ) : (
        <span className="font-normal text-ink-muted"> (optional)</span>
      )}
    </>
  )
  const message = error && (
    <p id={errorId} className="mt-1.5 flex items-center gap-1.5 text-sm text-pomegranate-dark">
      <AlertCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
      {error}
    </p>
  )

  if (field.type === 'checkboxes') {
    const toggle = (option) =>
      onChange(field.name, value.includes(option) ? value.filter((v) => v !== option) : [...value, option])
    return (
      <fieldset className="sm:col-span-2" aria-describedby={describedBy}>
        <legend className="mb-2 text-sm font-semibold text-forest">{label}</legend>
        <div className="flex flex-wrap gap-2">
          {field.options.map((option, i) => {
            const checked = value.includes(option)
            return (
              <label
                key={option}
                className={cn(
                  'relative inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition',
                  'has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-leaf/30',
                  checked ? 'border-leaf-dark bg-leaf-light text-leaf-dark' : 'border-forest/15 bg-white text-ink hover:border-forest/30',
                )}
              >
                <input
                  type="checkbox"
                  id={i === 0 ? id : undefined}
                  className="sr-only"
                  checked={checked}
                  onChange={() => toggle(option)}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    'flex h-4 w-4 items-center justify-center rounded border',
                    checked ? 'border-leaf-dark bg-leaf-dark text-white' : 'border-forest/25',
                  )}
                >
                  {checked && <Check className="h-3 w-3" strokeWidth={3} />}
                </span>
                {option}
              </label>
            )
          })}
        </div>
        {message}
      </fieldset>
    )
  }

  const common = {
    id,
    name: field.name,
    value,
    required: field.required,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
    onChange: (event) => onChange(field.name, event.target.value),
  }

  return (
    <div className={cn(!field.half && 'sm:col-span-2')}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-forest">
        {label}
      </label>
      {field.type === 'textarea' ? (
        <textarea {...common} rows={4} placeholder={field.placeholder} className={cn(inputClasses(error), 'py-3')} />
      ) : field.type === 'select' ? (
        <select {...common} className={cn(inputClasses(error), 'h-12 pr-10')}>
          <option value="">Choose…</option>
          {field.options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          {...common}
          type={field.type}
          autoComplete={field.autoComplete}
          placeholder={field.placeholder}
          className={cn(inputClasses(error), 'h-12')}
        />
      )}
      {message}
    </div>
  )
}

// One component for every enquiry form (A–D and "Other"), driven by data/forms.js.
// On success it goes to /thank-you/, or with `inline` shows the success message in place
// (the Dubai updates sign-up).
export default function EnquiryForm({ type, initialValues, inline = false, className }) {
  const form = forms[type]
  const uid = useId().replace(/:/g, '')
  const navigate = useNavigate()
  const formRef = useRef(null)
  const summaryRef = useRef(null)
  const [values, setValues] = useState(() => emptyValues(form, initialValues))
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | failed | sent
  const [trap, setTrap] = useState('')

  const update = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }))
    if (errors[name]) setErrors(({ [name]: _removed, ...rest }) => rest)
  }

  const focusFirstError = (fieldErrors) => {
    const first = [...form.fields.map((f) => f.name), 'consent'].find((name) => fieldErrors[name])
    const el = first && formRef.current?.querySelector(`#${uid}-${first}`)
    summaryRef.current?.focus()
    el?.focus({ preventScroll: true })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (status === 'sending') return
    // Honeypot: real visitors never see this field, so a filled value is a bot.
    if (trap) {
      setStatus('sent')
      return
    }
    const fieldErrors = validateEnquiry(type, values)
    setErrors(fieldErrors)
    if (Object.keys(fieldErrors).length) {
      setStatus('failed')
      requestAnimationFrame(() => focusFirstError(fieldErrors))
      return
    }
    setStatus('sending')
    try {
      await submitEnquiry(type, values)
      setStatus('sent')
      if (!inline) navigate('/thank-you/', { state: { type } })
    } catch (error) {
      setErrors(error.fieldErrors ?? {})
      setStatus('failed')
      requestAnimationFrame(() => summaryRef.current?.focus())
    }
  }

  if (status === 'sent' && inline) {
    return (
      <div role="status" className={cn('flex items-start gap-3 rounded-2xl bg-leaf-light p-6 text-leaf-dark', className)}>
        <CheckCircle2 aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0" />
        <p className="font-medium leading-relaxed">{formCopy.success}</p>
      </div>
    )
  }

  const [consentBefore, consentAfter] = formCopy.consent.split('Privacy Policy')

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} className={className} aria-label={`${form.label} enquiry form`}>
      <div ref={summaryRef} tabIndex={-1} aria-live="assertive" className="outline-none">
        {status === 'failed' && (
          <p className="mb-6 flex items-start gap-3 rounded-xl border border-pomegranate/30 bg-pomegranate-light px-4 py-3 text-sm font-medium text-pomegranate-dark">
            <AlertCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
            {formCopy.error}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {form.fields.map((field) => (
          <Field key={field.name} field={field} value={values[field.name]} error={errors[field.name]} onChange={update} uid={uid} />
        ))}
      </div>

      {/* Honeypot, hidden from people and assistive technology */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
        </label>
      </div>

      <div className="mt-6">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink">
          <input
            id={`${uid}-consent`}
            type="checkbox"
            checked={values.consent}
            onChange={(e) => update('consent', e.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${uid}-consent-error` : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-forest/30 accent-[#3E7B22]"
          />
          <span>
            {consentBefore}
            <Link to="/privacy-policy/" className="font-semibold text-leaf-dark underline underline-offset-2">
              Privacy Policy
            </Link>
            {consentAfter}
            <span className="text-pomegranate" aria-hidden="true">
              {' '}*
            </span>
          </span>
        </label>
        {errors.consent && (
          <p id={`${uid}-consent-error`} className="ml-8 mt-1.5 text-sm text-pomegranate-dark">
            {errors.consent}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-btn bg-forest px-7 text-[15px] font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-forest-dark hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70"
      >
        {status === 'sending' ? (
          <>
            <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            {form.submitLabel} <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </>
        )}
      </button>
      <p className="mt-4 text-xs text-ink-muted">
        <span className="text-pomegranate" aria-hidden="true">
          *
        </span>{' '}
        Required fields
      </p>
    </form>
  )
}
