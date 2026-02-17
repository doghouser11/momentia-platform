'use client'

import { useState } from 'react'

export default function CTA() {
  const [email, setEmail] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Handle newsletter signup
    alert(`Благодарим! Ще държим ${email} в течение за стартирането!`)
    setEmail('')
  }

  return (
    <section className="py-20 bg-gradient-to-br from-momentia-500 to-accent-500">
      <div className="max-w-4xl mx-auto px-4 text-center text-white">
        <h2 className="font-elegant text-4xl font-bold mb-4">
          Спрете да тичате след гостите за потвърждения!
        </h2>
        <p className="text-xl mb-8 text-white/90">
          Присъединете се към умните домакини, които оставят на Моментия да се справя с поканите, 
          докато те се фокусират върху планирането на перфектното тържество.
        </p>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl mb-4">
              📧
            </div>
            <h3 className="font-semibold mb-2">Автоматични отчети</h3>
            <p className="text-white/80 text-sm">Знаете точно кой идва</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl mb-4">
              📸
            </div>
            <h3 className="font-semibold mb-2">Live снимки от гости</h3>
            <p className="text-white/80 text-sm">Споделени спомени в реално време</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl mb-4">
              🎯
            </div>
            <h3 className="font-semibold mb-2">5-минутна настройка</h3>
            <p className="text-white/80 text-sm">Стартирате веднага</p>
          </div>
        </div>
        
        {/* Email Signup */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Вашият имейл адрес"
              required
              className="flex-1 px-6 py-4 text-lg rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="bg-white text-momentia-600 hover:bg-gray-100 font-medium py-4 px-8 rounded-full transition-colors duration-200"
            >
              Ранен достъп
            </button>
          </div>
        </form>
        
        {/* Social Proof */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👥</span>
            <span>500+ ранни записвания</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <span>Стартиране Февруари 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🇧🇬</span>
            <span>Направено в България</span>
          </div>
        </div>
      </div>
    </section>
  )
}