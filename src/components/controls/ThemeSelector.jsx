import { Check } from 'lucide-react'
import { EDITOR_THEMES } from '../../utils/constants'

export default function ThemeSelector({ value, onChange, isDark }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {EDITOR_THEMES.map((theme) => {
        const active = value === theme.id
        const activeSwatch = isDark ? theme.swatch : (theme.lightSwatch || theme.swatch)
        return (
          <button
            key={theme.id}
            onClick={() => onChange(theme.id)}
            className={`group relative flex flex-col gap-1.5 rounded-lg p-2.5 text-left transition-all duration-200 ease-out active:scale-[0.97] border ${active
              ? 'bg-base-card border-accent text-text-primary shadow-soft ring-1 ring-accent/20'
              : 'bg-base-surface/50 border-base-border text-text-secondary hover:border-text-secondary/40 hover:bg-base-hover hover:text-text-primary hover:-translate-y-[1px]'
              }`}
          >
            <div className="flex gap-1.5">
              {activeSwatch.map((c, i) => (
                <span
                  key={i}
                  className="h-3 w-3 rounded-full ring-1 ring-black/10 dark:ring-black/30 transition-transform duration-200 ease-out group-hover:scale-110"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-text-primary">
              {theme.label}
            </span>
            <div
              className={`absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent transition-all duration-200 ease-out ${active ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}
            >
              <Check size={10} className="text-white" strokeWidth={3} />
            </div>
          </button>
        )
      })}
    </div>
  )
}
