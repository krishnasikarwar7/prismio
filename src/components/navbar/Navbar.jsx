import { Moon, Sun, Download, Copy, Image, Loader2, Check } from 'lucide-react'

export default function Navbar({
  isDark,
  onToggleTheme,
  onCopyCode,
  onCopyImage,
  isCopyingImage,
  isCodeCopied,
  onExportClick,
}) {
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b px-2 sm:px-4 lg:px-6 backdrop-blur-md transition-colors duration-200 ${isDark
        ? 'border-[rgba(255,255,255,0.08)] bg-[#18181B]/80 text-[#FAFAFA]'
        : 'border-[#E5E7EB] bg-[#FFFFFF]/80 text-[#111827]'
        }`}
    >
      {/* Logo & Brand Title */}
      <div className="flex items-center gap-2.5">
        <img
          src={isDark ? "/logo-dark.png" : "/logo-light.png"}
          alt="Prismio"
          className="h-9 w-9 object-contain"
        />
        <span
          className={`text-[15px] font-semibold tracking-tight ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'
            }`}
        >
          Prismio
        </span>
        <span
          className={`hidden text-[13px] font-normal tracking-wide sm:inline ${isDark ? 'text-[#71717A]' : 'text-[#9CA3AF]'
            }`}
        >
          Beautiful code. Instantly.
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          title="Toggle theme"
          className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all duration-200 ease-out cursor-pointer ${isDark
            ? 'border-[rgba(255,255,255,0.08)] bg-[#1C1C1E] text-[#A1A1AA] hover:bg-[#242426] hover:text-[#F5F5F5]'
            : 'border-[#E5E7EB] bg-[#FFFFFF] text-[#6B7280] hover:bg-[#F8F8F8] hover:text-[#111827]'
            }`}
        >
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        {/* [📋 Copy Code] Button */}
        <button
          type="button"
          onClick={onCopyCode}
          title="Copy the current source code"
          className={`flex h-8 items-center gap-1.5 rounded-lg border px-2 sm:px-3 text-[13px] font-medium transition-all duration-200 ease-out active:scale-95 cursor-pointer ${isDark
            ? 'border-[rgba(255,255,255,0.08)] bg-[#1C1C1E] text-[#F5F5F5] hover:bg-[#242426] hover:border-white/15'
            : 'border-[#E5E7EB] bg-[#FFFFFF] text-[#374151] hover:bg-[#F8F8F8] hover:border-[#D1D5DB]'
            }`}
        >
          {isCodeCopied ? (
            <Check size={14} className="text-[#A35E47] shrink-0" />
          ) : (
            <Copy size={14} className="shrink-0" />
          )}
          <span className="hidden sm:inline">{isCodeCopied ? 'Copied' : 'Copy Code'}</span>
        </button>

        {/* [🖼 Copy Image] Button */}
        <button
          type="button"
          onClick={onCopyImage}
          disabled={isCopyingImage}
          title="Copy the preview as a PNG"
          className={`flex h-8 items-center gap-1.5 rounded-lg border px-2 sm:px-3 text-[13px] font-medium transition-all duration-200 ease-out active:scale-95 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${isDark
            ? 'border-[rgba(255,255,255,0.08)] bg-[#1C1C1E] text-[#F5F5F5] hover:bg-[#242426] hover:border-white/15'
            : 'border-[#E5E7EB] bg-[#FFFFFF] text-[#374151] hover:bg-[#F8F8F8] hover:border-[#D1D5DB]'
            }`}
        >
          {isCopyingImage ? (
            <Loader2 size={14} className="animate-spin text-[#A35E47] shrink-0" />
          ) : (
            <Image size={14} className="shrink-0" />
          )}
          <span className="hidden sm:inline">
            {isCopyingImage ? 'Copying...' : 'Copy Image'}
          </span>
        </button>

        {/* [⬇ Export] Button */}
        <button
          type="button"
          onClick={onExportClick}
          title="Download your code image"
          className="flex h-8 items-center gap-1.5 rounded-lg bg-[#A35E47] px-2 sm:px-3.5 text-[13px] font-medium text-white transition-all duration-200 ease-out hover:bg-[#A35E47]/90 active:scale-95 cursor-pointer shadow-sm"
        >
          <Download size={14} className="shrink-0" />
          <span className="hidden sm:inline">Export</span>
        </button>
      </div>
    </header>
  )
}
