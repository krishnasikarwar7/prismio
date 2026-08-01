import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, Search, Check, Code2, X } from 'lucide-react'
import { LANGUAGES, LANGUAGE_CATEGORIES } from '../../utils/constants'

function matchLanguage(lang, query) {
  if (!query || !query.trim()) return true
  const q = query.trim().toLowerCase()

  const label = lang.label.toLowerCase()
  const id = lang.id.toLowerCase()
  const ext = (lang.extension || '').toLowerCase()
  const category = (lang.category || '').toLowerCase()

  if (label.includes(q) || id.includes(q) || ext.includes(q) || category.includes(q)) {
    return true
  }

  // Common language query aliases
  if (q === 'py' && (id === 'python' || label.includes('python'))) return true
  if (q === 'js' && (id === 'javascript' || label.includes('javascript'))) return true
  if (q === 'ts' && (id === 'typescript' || label.includes('typescript'))) return true
  if (q === 'md' && (id === 'markdown' || label.includes('markdown'))) return true
  if ((q === 'cpp' || q === 'c++') && (id === 'cpp' || label.includes('c++'))) return true
  if ((q === 'cs' || q === 'c#') && (id === 'csharp' || label.includes('c#'))) return true
  if (q === 'docker' && id === 'dockerfile') return true
  if (q === 'yml' && id === 'yaml') return true
  if (q === 'postgres' && id === 'pgsql') return true
  if (q === 'sh' && (id === 'shell' || id === 'bash')) return true

  return false
}

function HighlightedText({ text, query }) {
  if (!query || !query.trim()) {
    return <span>{text}</span>
  }
  const q = query.trim().toLowerCase()
  const index = text.toLowerCase().indexOf(q)
  if (index === -1) {
    return <span>{text}</span>
  }
  const before = text.slice(0, index)
  const match = text.slice(index, index + q.length)
  const after = text.slice(index + q.length)

  return (
    <span>
      {before}
      <span className="bg-[#A35E47]/20 text-[#A35E47] font-semibold rounded-[2px] px-0.5 py-0.2">
        {match}
      </span>
      {after}
    </span>
  )
}

export default function LanguageSelector({ value, onChange, isDark }) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, openUpward: false })

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

  const selectedLang = LANGUAGES.find((l) => l.id === value) || LANGUAGES[0]

  const filteredLanguages = useMemo(() => {
    return LANGUAGES.filter((lang) => matchLanguage(lang, searchQuery))
  }, [searchQuery])

  // Compute portal coordinates
  const updateCoords = useCallback(() => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const maxMenuHeight = 320
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

  // Reset active keyboard index when search query changes
  useEffect(() => {
    setActiveIndex(0)
  }, [searchQuery])

  // Auto focus input when opening
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 30)
      return () => clearTimeout(timer)
    } else {
      setSearchQuery('')
    }
  }, [isOpen])

  // Scroll active item into view
  useEffect(() => {
    if (isOpen && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      })
    }
  }, [activeIndex, isOpen])

  // Click outside to close (checking both container and portaled dropdown)
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

  // Keyboard navigation
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
        filteredLanguages.length > 0 ? (prev + 1) % filteredLanguages.length : 0
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((prev) =>
        filteredLanguages.length > 0
          ? (prev - 1 + filteredLanguages.length) % filteredLanguages.length
          : 0
      )
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredLanguages[activeIndex]) {
        handleSelect(filteredLanguages[activeIndex].id)
      }
    }
  }

  const handleSelect = (langId) => {
    onChange(langId)
    setIsOpen(false)
    setSearchQuery('')
  }

  const handleClear = (e) => {
    e.stopPropagation()
    setSearchQuery('')
    inputRef.current?.focus()
  }

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      className="relative w-full select-none"
    >
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
          <Code2 size={16} className="text-[#A35E47] shrink-0" />
          <span className="truncate">{selectedLang.label}</span>
        </div>
        <ChevronDown
          size={15}
          className={`shrink-0 transition-transform duration-200 ease-out ${
            isDarkMode ? 'text-[#A1A1AA]' : 'text-[#6B7280]'
          } ${isOpen ? 'rotate-180 text-[#A35E47]' : ''}`}
        />
      </button>

      {/* Floating Command Menu Dropdown via React Portal */}
      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: 'fixed',
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              width: `${coords.width}px`,
              zIndex: 1000,
              transform: coords.openUpward ? 'translateY(-100%)' : 'none',
            }}
            className={`flex max-h-[320px] flex-col rounded-xl border shadow-2xl overflow-hidden transition-all duration-200 animate-fadeIn ${
              isDarkMode
                ? 'bg-[#1C1C1E] border-[rgba(255,255,255,0.08)] text-[#F5F5F5]'
                : 'bg-[#FFFFFF] border-[#E5E7EB] text-[#111827]'
            }`}
          >
            {/* Search Bar Container (44px height) */}
            <div
              className={`relative flex h-[44px] shrink-0 items-center border-b px-3.5 transition-all duration-200 ${
                isDarkMode
                  ? 'border-[rgba(255,255,255,0.08)] bg-[#1C1C1E]'
                  : 'border-[#E5E7EB] bg-[#FFFFFF]'
              }`}
            >
              <Search
                size={16}
                className={`shrink-0 ${
                  isDarkMode ? 'text-[#A1A1AA]' : 'text-[#6B7280]'
                }`}
              />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search languages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`h-full w-full bg-transparent pl-2.5 pr-7 text-[13px] font-medium outline-none placeholder-[#9CA3AF] ${
                  isDarkMode ? 'text-[#F5F5F5]' : 'text-[#111827]'
                }`}
              />

              {/* Clear Button (×) */}
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

            {/* Options List with Internal Scrolling */}
            <div className="flex-1 overflow-y-auto p-2 scrollbar-thin max-h-[270px]">
              {filteredLanguages.length === 0 ? (
                <div className="px-3 py-6 text-center text-[13px] font-medium text-[#9CA3AF]">
                  No matching languages found.
                </div>
              ) : (
                LANGUAGE_CATEGORIES.map((category) => {
                  const catLanguages = filteredLanguages.filter(
                    (l) => l.category === category
                  )
                  if (catLanguages.length === 0) return null

                  return (
                    <div key={category} className="mb-2 last:mb-0">
                      {/* Category Header */}
                      <div
                        className={`px-2.5 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider select-none ${
                          isDarkMode ? 'text-[#71717A]' : 'text-[#9CA3AF]'
                        }`}
                      >
                        {category}
                      </div>

                      {/* Category Options */}
                      {catLanguages.map((lang) => {
                        const globalIndex = filteredLanguages.findIndex(
                          (l) => l.id === lang.id
                        )
                        const isSelected = value === lang.id
                        const isKeyboardActive = globalIndex === activeIndex

                        let itemStyle = ''
                        if (isSelected) {
                          itemStyle = isDarkMode
                            ? 'bg-[#A35E47]/20 text-[#FFFFFF] font-semibold'
                            : 'bg-[#A35E47]/10 text-[#111827] font-semibold'
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
                            key={lang.id}
                            type="button"
                            ref={(el) => (itemRefs.current[globalIndex] = el)}
                            onClick={() => handleSelect(lang.id)}
                            onMouseEnter={() => setActiveIndex(globalIndex)}
                            className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors text-left cursor-pointer ${itemStyle}`}
                          >
                            <span className="truncate">
                              <HighlightedText
                                text={lang.label}
                                query={searchQuery}
                              />
                            </span>
                            {isSelected && (
                              <Check
                                size={14}
                                className="text-[#A35E47] shrink-0 ml-2"
                                strokeWidth={2.5}
                              />
                            )}
                          </button>
                        )
                      })}
                    </div>
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



