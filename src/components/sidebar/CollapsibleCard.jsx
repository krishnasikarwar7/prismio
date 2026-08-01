import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function CollapsibleCard({ title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="group border-b border-base-border last:border-b-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-6 py-4 text-left transition-all duration-200 ease-out hover:bg-base-hover active:bg-base-hover/70"
      >
        <span className="text-[12px] font-medium tracking-[0.1em] uppercase text-text-secondary transition-colors duration-200 group-hover:text-text-primary">{title}</span>
        <ChevronDown
          size={14}
          className={`text-text-secondary transition-all duration-200 ease-out group-hover:text-text-primary ${open ? 'rotate-180' : ''
            }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 pt-2">{children}</div>
        </div>
      </div>
    </div>
  )
}
