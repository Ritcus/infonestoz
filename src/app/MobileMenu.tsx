'use client' // <-- This directive makes it a Client Component

import { useState } from 'react'
import Link from 'next/link'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="md:hidden text-2xl"
      >
        ☰
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-white z-50 p-8 md:hidden">
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-2xl"
          >
            ✕
          </button>
          <nav className="flex flex-col space-y-6 mt-12">
            <Link href="/" className="text-xl">Home</Link>
            <Link href="/blog" className="text-xl">Blog</Link>
            <Link href="/contact" className="text-xl">Contact us</Link>
          </nav>
        </div>
      )}
    </>
  )
}