import React from 'react'

export default function Footer() {
  return (
    <footer className="w-full border-t border-base-border bg-base-bg py-6 lg:py-0 lg:h-16 flex items-center transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 w-full grid grid-cols-1 lg:grid-cols-3 items-center gap-3 lg:gap-0">
        {/* Left: Copyright */}
        <div className="text-center lg:text-left text-[13px] text-text-muted select-none">
          &copy; 2026 Prismio
        </div>

        {/* Center: Attribution */}
        <div className="text-center text-[13px] text-text-muted">
          Made by <span className="text-text-secondary font-medium">Krishna Sikarwar</span>
        </div>

        {/* Right: Links */}
        <div className="text-center lg:text-right text-[13px] font-medium text-text-secondary flex items-center justify-center lg:justify-end gap-2.5">
          <a
            href="https://github.com/krishnasikarwar7/prismio"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors duration-150"
          >
            GitHub
          </a>
          <span className="text-text-muted/30 select-none">&bull;</span>
          <a
            href="https://krishnasikarwar-portfolio.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors duration-150"
          >
            Portfolio
          </a>
          <span className="text-text-muted/30 select-none">&bull;</span>
          <a
            href="https://github.com/krishnasikarwar7/prismio/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors duration-150"
          >
            Report Issue
          </a>
        </div>
      </div>
    </footer>
  )
}
