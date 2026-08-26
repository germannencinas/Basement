function Logo() {
  return (
    <span className="flex items-center gap-2">

      <svg viewBox="0 0 28 24" aria-hidden="true" className="h-6 w-7">
        <rect x="0" y="12" width="6" height="8" rx="3" fill="#c27aff" />
        <rect x="10" y="8" width="6" height="12" rx="3" fill="#ffffff" />
        <rect x="20" y="4" width="6" height="16" rx="3" fill="#00bcff" />
      </svg>

      <span className="font-logo text-2xl font-extrabold tracking-tight">
        Basement
      </span>
    </span>
  )
}

export default Logo
