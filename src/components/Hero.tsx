'use client'

import { useState } from 'react'
import AuthModal from './AuthModal'

export default function Hero() {
  const [email, setEmail] = useState('')
  const [showAuth, setShowAuth] = useState(false)
  
  const handleEarlyAccess = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Handle early access signup
    alert(`Благодарим! Ще уведомим ${email} когато стартираме!`)
    setEmail('')
  }

  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-momentia-50 to-accent-50">
        <div className="absolute inset-0 bg-white/60"></div>
      </div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-24 lg:py-32">
        <div className="text-center">
          {/* Personal Introduction from Nikol */}
          <div className="max-w-4xl mx-auto mb-12 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-momentia-200 shadow-lg">
            <p className="text-lg text-gray-700 leading-relaxed">
              <span className="text-momentia-600 font-semibold">Здравейте, аз съм Никол!</span> Превърнах хобито си в услуга, защото знам, че планирането на празник трябва да носи радост, а не главоболие. С мен не купувате просто код, а спокойствие. Получавате 3 персонализирани сайта за година – за вашата сватба, рд-то или кръщенето на малките (най ги обичам) или за лудото ергенско/моминско парти. Всичко е на един клик разстояние, без сложни настройки. 
              <span className="text-momentia-600 font-semibold"> Нека направим празника ви незабравим заедно!</span>
            </p>
          </div>
          
          {/* Main Headline */}
          <h1 className="font-elegant text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Спокойствие за
            <span className="block text-momentia-500">вашите събития</span>
            <span className="block text-lg sm:text-xl font-modern font-normal mt-4 text-gray-600">
              Без стрес, без притеснения
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-8">
            Не купувате сайт - купувате спокойствие. Мислете за гостите, не за поканите. 
            Ние следим кой идва, кой не може, кой има алергии. Вие се занимавайте с важното.
          </p>
          
          {/* Early Access Form */}
          <form onSubmit={handleEarlyAccess} className="max-w-md mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Вашият имейл"
                required
                className="flex-1 px-6 py-4 text-lg rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-momentia-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="btn-primary text-lg px-8 py-4 whitespace-nowrap"
              >
                Записване
              </button>
            </div>
          </form>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-momentia-600">5</div>
              <div className="text-sm text-gray-600">Готови шаблона</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-momentia-600">5мин</div>
              <div className="text-sm text-gray-600">Време за настройка</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-momentia-600">180€</div>
              <div className="text-sm text-gray-600">Начална цена</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Auth Button */}
      <div className="absolute top-8 right-8">
        <button
          onClick={() => setShowAuth(true)}
          className="bg-white/90 backdrop-blur text-momentia-600 hover:bg-white font-medium py-2 px-6 rounded-full border border-momentia-200 transition-colors duration-200 shadow-lg"
        >
          Вход / Регистрация
        </button>
      </div>

      {/* Mascot Preview */}
      <div className="absolute bottom-10 right-10 hidden lg:block">
        <div className="w-20 h-20 bg-momentia-100 rounded-full flex items-center justify-center text-4xl animate-bounce">
          🐱
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  )
}