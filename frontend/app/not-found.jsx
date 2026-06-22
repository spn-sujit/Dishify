import Link from 'next/link'
import React from 'react'
import { ArrowLeft } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-xl mx-auto px-4 flex flex-col items-center">
        <div className="relative mb-6 flex flex-col items-center">
          <div className="text-8xl select-none animate-bounce duration-1000 z-10">🍳</div>
          <div className="w-16 h-2 bg-stone-900/10 rounded-full blur-xs absolute bottom-[-4px] animate-pulse duration-1000 scale-x-75 group-hover:scale-x-100 transition-transform" />
        </div>
        <h1 className="text-6xl font-black text-orange-600 tracking-tight mb-4">
          404
        </h1>
        <h2 className="text-2xl font-bold text-orange-600 mb-3 tracking-tight">
          Page Not Found
        </h2>
        <p className="text-stone-600 mb-8 font-light text-sm leading-relaxed max-w-sm mx-auto">
          Oops! It looks like this page was taken off the menu or doesn&apos;t exist. Let&apos;s get you back to something delicious.
        </p>
        <Link href="/dashboard" className="inline-block group">
          <span className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold transition-all duration-200 bg-white px-6 py-3 rounded-xl border border-orange-200 shadow-xs group-hover:shadow-sm">
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </span>
        </Link>
      </div>
    </div>
  )
}

export default NotFound