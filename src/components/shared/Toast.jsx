import { useEffect } from 'react'
import { CheckCircle2, AlertCircle, X } from 'lucide-react'

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    const id = setTimeout(() => {
      onClose()
    }, duration)
    return () => clearTimeout(id)
  }, [duration, onClose])

  const isSuccess = type === 'success'

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-fadeIn">
      <div className={`flex items-center gap-3 rounded-xl border px-4.5 py-3 shadow-elevated backdrop-blur-md transition-all duration-300 ${
        isSuccess
          ? 'bg-zinc-950/95 border-emerald-500/20 text-emerald-400'
          : 'bg-zinc-950/95 border-red-500/20 text-red-400'
      }`}>
        {isSuccess ? (
          <CheckCircle2 size={16} className="shrink-0 text-emerald-400 animate-pulse" />
        ) : (
          <AlertCircle size={16} className="shrink-0 text-red-400 animate-bounce" />
        )}
        <span className="text-[13px] font-medium text-zinc-100">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 rounded-md p-0.5 text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
