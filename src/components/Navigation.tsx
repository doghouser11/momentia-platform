'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl">💝</div>
            <span className="font-elegant text-xl font-semibold text-momentia-600">
              Momentia
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/"
              className="text-gray-700 hover:text-momentia-600 transition-colors"
            >
              Начало
            </Link>
            <Link 
              href="/templates"
              className="text-gray-700 hover:text-momentia-600 transition-colors"
            >
              🎨 Template-и
            </Link>
            <Link 
              href="/admin"
              className="text-gray-700 hover:text-momentia-600 transition-colors"
            >
              🔴 Admin
            </Link>
            <Link 
              href="#pricing"
              className="text-gray-700 hover:text-momentia-600 transition-colors"
            >
              Цени
            </Link>
            <button className="btn-primary">
              Започни сега
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="space-y-2">
              <div className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></div>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/"
                className="text-gray-700 hover:text-momentia-600 transition-colors px-3 py-2"
                onClick={() => setIsOpen(false)}
              >
                Начало
              </Link>
              <Link 
                href="/templates"
                className="text-gray-700 hover:text-momentia-600 transition-colors px-3 py-2"
                onClick={() => setIsOpen(false)}
              >
                🎨 Template-и
              </Link>
              <Link 
                href="/admin"
                className="text-gray-700 hover:text-momentia-600 transition-colors px-3 py-2"
                onClick={() => setIsOpen(false)}
              >
                🔴 Admin
              </Link>
              <Link 
                href="#pricing"
                className="text-gray-700 hover:text-momentia-600 transition-colors px-3 py-2"
                onClick={() => setIsOpen(false)}
              >
                Цени
              </Link>
              <button className="btn-primary mx-3 mt-4">
                Започни сега
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}