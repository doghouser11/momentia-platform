'use client'

import { useState } from 'react'

export default function LivePhotoUpload() {
  const [isUploading, setIsUploading] = useState(false)
  const [recentPhotos, setRecentPhotos] = useState([
    { id: 1, author: 'Мария К.', time: '2 мин', image: '📸' },
    { id: 2, author: 'Петър С.', time: '5 мин', image: '🎉' },
    { id: 3, author: 'Анна М.', time: '12 мин', image: '💃' },
  ])

  const handleUpload = () => {
    setIsUploading(true)
    // Simulate upload process
    setTimeout(() => {
      const newPhoto = {
        id: Date.now(),
        author: 'Вие',
        time: 'сега',
        image: '✨'
      }
      setRecentPhotos([newPhoto, ...recentPhotos])
      setIsUploading(false)
    }, 2000)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-elegant text-4xl font-bold text-gray-900 mb-4">
            Живи спомени от вашето събитие
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Всеки гост може да качи снимка веднага! Създава се автоматична галерия 
            със споделени моменти в реално време.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Upload Interface */}
          <div className="card">
            <h3 className="text-2xl font-semibold mb-6 text-center">
              Качете снимка сега
            </h3>
            
            {/* Upload Button */}
            <div className="border-2 border-dashed border-momentia-300 rounded-2xl p-8 text-center mb-6 hover:border-momentia-500 transition-colors duration-200">
              <div className="text-6xl mb-4">📷</div>
              <p className="text-gray-600 mb-4">
                Изберете снимка или направете нова
              </p>
              <button 
                onClick={handleUpload}
                disabled={isUploading}
                className={`btn-primary ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isUploading ? 'Качва се...' : 'Изберете снимка'}
              </button>
            </div>

            {/* Instructions */}
            <div className="text-sm text-gray-500 space-y-2">
              <p>✓ Автоматично качване в галерията</p>
              <p>✓ Всички гости виждат моментално</p>
              <p>✓ Създава се споделена колекция</p>
            </div>
          </div>

          {/* Live Feed */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold">
                Последни снимки
              </h3>
              <div className="flex items-center gap-2 text-green-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Live</span>
              </div>
            </div>

            {/* Photo Feed */}
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {recentPhotos.map((photo) => (
                <div key={photo.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-momentia-100 rounded-xl flex items-center justify-center text-2xl">
                    {photo.image}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {photo.author}
                    </div>
                    <div className="text-sm text-gray-500">
                      преди {photo.time}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    ❤️ 3
                  </div>
                </div>
              ))}
            </div>

            {/* Gallery Stats */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-momentia-600">
                    {recentPhotos.length + 15}
                  </div>
                  <div className="text-xs text-gray-500">Общо снимки</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-momentia-600">12</div>
                  <div className="text-xs text-gray-500">Активни гости</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-momentia-600">47</div>
                  <div className="text-xs text-gray-500">Харесвания</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}