import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, Search, Check, Type, X } from 'lucide-react'
import { FONTS, loadFont } from '../../utils/fonts'

function HighlightedText({ text, query }) {
  if (!query || !query.trim()) return <span>{text}</span>
  const q = query.trim().toLowerCase()
  const index = text.toLowerCase().indexOf(q)
  if (index === -1) return <span>{text}</span>
  const before = text.slice(0, index)
  const match = text.slice(index, index + q.length)
  const after = text.slice(index + q.length)
  return (
    <span>
      {before}
      <span className="bg-[#A35E47]/20 text-[#A35E47] font-semibold rounded-[2px] px-0.5">
        {match}
      </span>
      {after}
    </span>
  )
}

export default function FontSelector({ value, onChange, isDark }) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, openUpward: false })
  const [loadingFonts, setLoadingFonts] = useState(new Set())

  const containerRef = useRef(null)
  const dropdownRef = useRef(null)
  const inputRef = useRef(null)
  const itemRefs = useRef([])

  const isDarkMode =
    isDark !== undefined
      ? isDark
      : typeof document !== 'undefined'
      ? !document.documentElement.classList.contains('light-mode')
      : true

  const selectedFont = FONTS.find((f) => f.id === value) || FONTS[0]

  const filteredFonts = useMemo(() => {
    if (!searchQuery.trim()) return FONTS
    const q = searchQuery.trim().toLowerCase()
    return FONTS.filter(
      (f) =>
        f.label.toLowerCase().includes(q) ||
        f.id.toLowerCase().includes(q)
    )
  }, [searchQuery])

  // Compute portal coordinates
  const updateCoords = useCallback(() => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const maxMenuHeight = 380
    const margin = 6
    const spaceBelow = window.innerHeight - rect.bottom
    const openUpward = spaceBelow < maxMenuHeight && rect.top > maxMenuHeight

    setCoords({
      top: openUpward ? rect.top - margin : rect.bottom + margin,
      left: rect.left,
      width: rect.width,
      openUpward,
    })
  }, [])

  useEffect(() => {
    if (isOpen) {
      updateCoords()
      window.addEventListener('resize', updateCoords)
      window.addEventListener('scroll', updateCoords, true)
      return () => {
        window.removeEventListener('resize', updateCoords)
        window.removeEventListener('scroll', updateCoords, true)
      }
    }
  }, [isOpen, updateCoords])

  // Eagerly load fonts that appear in the visible list so previews render
  useEffect(() => {
    if (!isOpen) return
    filteredFonts.forEach((font) => {
      if (font.googleUrl) {
        loadFont(font.id).catch(() => {})
      }
    })
  }, [isOpen, filteredFonts])

  useEffect(() => {
    setActiveIndex(0)
  }, [searchQuery])

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 30)
      return () => clearTimeout(timer)
    } else {
      setSearchQuery('')
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      })
    }
  }, [activeIndex, isOpen])

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === 'ArrowDown') {
        e.preventDefault()
        setIsOpen(true)
      }
      return
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      setIsOpen(false)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((prev) =>
        filteredFonts.length > 0 ? (prev + 1) % filteredFonts.length : 0
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((prev) =>
        filteredFonts.length > 0
          ? (prev - 1 + filteredFonts.length) % filteredFonts.length
          : 0
      )
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredFonts[activeIndex]) {
        handleSelect(filteredFonts[activeIndex].id)
      }
    }
  }

  const handleSelect = async (fontId) => {
    // Load font before switching so the editor doesn't flash unstyled
    setLoadingFonts((prev) => new Set(prev).add(fontId))
    try {
      await loadFont(fontId)
    } catch { /* non-critical */ }
    setLoadingFonts((prev) => {
      const next = new Set(prev)
      next.delete(fontId)
      return next
    })
    onChange(fontId)
    setIsOpen(false)
    setSearchQuery('')
  }

  const handleClear = (e) => {
    e.stopPropagation()
    setSearchQuery('')
    inputRef.current?.focus()
  }

  return (
    <div ref={containerRef} onKeyDown={handleKeyDown} className="relative w-full select-none">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex h-[44px] w-full items-center justify-between rounded-xl px-3.5 text-[13px] font-medium transition-all duration-200 ease-out border text-left active:scale-[0.99] cursor-pointer ${
          isDarkMode
            ? 'bg-[#1C1C1E] border-[rgba(255,255,255,0.08)] text-[#F5F5F5] hover:bg-[#242426] hover:border-white/15'
            : 'bg-[#FFFFFF] border-[#E5E7EB] text-[#111827] hover:bg-[#F8F8F8] hover:border-[#D1D5DB]'
        } ${
          isOpen
            ? isDarkMode
              ? 'border-[#A35E47] ring-2 ring-[#A35E47]/20'
              : 'border-[#A35E47] ring-2 ring-[#A35E47]/15'
            : ''
        }`}
      >
        <div className="flex items-center gap-2.5 truncate">
          <Type size={16} className="text-[#A35E47] shrink-0" />
          <span className="truncate">{selectedFont.label}</span>
        </div>
        <ChevronDown
          size={15}
          className={`shrink-0 transition-transform duration-200 ease-out ${
            isDarkMode ? 'text-[#A1A1AA]' : 'text-[#6B7280]'
          } ${isOpen ? 'rotate-180 text-[#A35E47]' : ''}`}
        />
      </button>

      {/* Floating Dropdown via React Portal */}
      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            onKeyDown={handleKeyDown}
            style={{
              position: 'fixed',
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              width: `${coords.width}px`,
              zIndex: 1000,
              transform: coords.openUpward ? 'translateY(-100%)' : 'none',
            }}
            className={`flex max-h-[380px] flex-col rounded-xl border shadow-2xl overflow-hidden transition-all duration-200 animate-fadeIn ${
              isDarkMode
                ? 'bg-[#1C1C1E] border-[rgba(255,255,255,0.08)] text-[#F5F5F5]'
                : 'bg-[#FFFFFF] border-[#E5E7EB] text-[#111827]'
            }`}
          >
            {/* Search Bar */}
            <div
              className={`relative flex h-[44px] shrink-0 items-center border-b px-3.5 transition-all duration-200 ${
                isDarkMode
                  ? 'border-[rgba(255,255,255,0.08)] bg-[#1C1C1E]'
                  : 'border-[#E5E7EB] bg-[#FFFFFF]'
              }`}
            >
              <Search
                size={16}
                className={`shrink-0 ${isDarkMode ? 'text-[#A1A1AA]' : 'text-[#6B7280]'}`}
              />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search fonts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`h-full w-full bg-transparent pl-2.5 pr-7 text-[13px] font-medium outline-none placeholder-[#9CA3AF] ${
                  isDarkMode ? 'text-[#F5F5F5]' : 'text-[#111827]'
                }`}
              />
              {searchQuery.length > 0 && (
                <button
                  type="button"
                  onClick={handleClear}
                  className={`absolute right-3 flex h-5 w-5 items-center justify-center rounded-full transition-colors ${
                    isDarkMode
                      ? 'text-[#A1A1AA] hover:bg-white/10 hover:text-white'
                      : 'text-[#6B7280] hover:bg-gray-100 hover:text-[#111827]'
                  }`}
                  title="Clear search"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Font List */}
            <div className="flex-1 overflow-y-auto p-2 scrollbar-thin max-h-[330px]">
              {filteredFonts.length === 0 ? (
                <div className="px-3 py-6 text-center text-[13px] font-medium text-[#9CA3AF]">
                  No matching fonts found.
                </div>
              ) : (
                filteredFonts.map((font, index) => {
                  const isSelected = value === font.id
                  const isKeyboardActive = index === activeIndex

                  let itemStyle = ''
                  if (isSelected) {
                    itemStyle = isDarkMode
                      ? 'bg-[#A35E47]/20 text-[#FFFFFF]'
                      : 'bg-[#A35E47]/10 text-[#111827]'
                  } else if (isKeyboardActive) {
                    itemStyle = isDarkMode
                      ? 'bg-[#242426] text-[#F5F5F5]'
                      : 'bg-[#F8F8F8] text-[#111827]'
                  } else {
                    itemStyle = isDarkMode
                      ? 'text-[#E5E7EB] hover:bg-[#242426] hover:text-[#F5F5F5]'
                      : 'text-[#374151] hover:bg-[#F8F8F8] hover:text-[#111827]'
                  }

                  return (
                    <button
                      key={font.id}
                      type="button"
                      ref={(el) => (itemRefs.current[index] = el)}
                      onClick={() => handleSelect(font.id)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`flex w-full flex-col gap-1 rounded-lg px-3 py-2.5 text-left transition-colors cursor-pointer ${itemStyle}`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={`text-[13px] font-medium truncate ${isSelected ? 'font-semibold' : ''}`}>
                          <HighlightedText text={font.label} query={searchQuery} />
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          {font.hasLigatures && (
                            <span
                              className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                                isDarkMode
                                  ? 'bg-[#A35E47]/20 text-[#A35E47]'
                                  : 'bg-[#A35E47]/10 text-[#A35E47]'
                              }`}
                            >
                              Lig
                            </span>
                          )}
                          {isSelected && (
                            <Check size={14} className="text-[#A35E47]" strokeWidth={2.5} />
                          )}
                        </div>
                      </div>
                      {/* Live font preview */}
                      <span
                        className={`text-[12px] truncate transition-colors ${
                          isDarkMode ? 'text-[#71717A]' : 'text-[#9CA3AF]'
                        }`}
                        style={{ fontFamily: font.family }}
                      >
                        {font.preview}
                      </span>
                    </button>
                  )
                })
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}
