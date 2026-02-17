'use client'

import { useState } from 'react'
import EventTemplate from '@/components/EventTemplate'

const sampleEvents = [
  {
    id: 'classic-elegant-demo',
    title: 'Сватбата на Анна и Георги',
    description: 'С радост ви каним да споделите най-специалния ден в нашия живот',
    eventDate: '2024-06-15T16:00:00',
    location: 'Хотел Гранд, София',
    mapLink: 'https://maps.google.com/...',
    template: 'classic-elegant',
    coverPhoto: null,
    gallery: [
      {
        id: '1',
        url: '/api/placeholder/600/400',
        caption: 'Нашата първа среща',
        isLive: false
      }
    ],
    story: 'Срещнахме се преди пет години на една дъждовна есенна вечер в малко кафене в центъра на София. Оттогава не се разделяме и сега искаме да споделим радостта си с всички вас.',
    liveGalleryEnabled: false,
    isOwner: false
  },
  {
    id: 'baroque-luxury-demo', 
    title: 'ИМПЕРАТОРСКА СВАТБА',
    description: 'МАРИЯ ВИКТОРИЯ & АЛЕКСАНДЪР НИКОЛАЕВ',
    eventDate: '2024-09-20T18:00:00',
    location: 'Замъкът Равадиново, Созопол',
    template: 'baroque-luxury',
    coverPhoto: null,
    gallery: [],
    story: 'В духа на старите аристократични традиции, канят Ви да присъствате на тържеството, което ще остане завинаги в историята.',
    liveGalleryEnabled: true,
    isOwner: false
  },
  {
    id: 'minimalist-modern-demo',
    title: 'Петър & Ива',
    description: 'Просто. Елегантно. Наше.',
    eventDate: '2024-07-12T15:00:00', 
    location: 'Арт център, Пловдив',
    template: 'minimalist-modern',
    coverPhoto: null,
    gallery: [],
    story: 'Минимализмът е нашата философия. В простотата се крие истинската красота.',
    liveGalleryEnabled: false,
    isOwner: false
  },
  {
    id: 'rustic-warmth-demo',
    title: 'Магдалена и Стоян',
    description: '🌿 Сред природата, с любов 🌿',
    eventDate: '2024-08-25T14:00:00',
    location: 'Етнографски комплекс "Боженци"',
    template: 'rustic-warmth',
    coverPhoto: null,
    gallery: [
      {
        id: '1',
        url: '/api/placeholder/600/400',
        caption: 'Нашата планинска разходка',
        isLive: false
      },
      {
        id: '2', 
        url: '/api/placeholder/600/400',
        caption: 'Под старата липа',
        isLive: false
      }
    ],
    story: 'Обичаме планините, старите традиции и топлината на семейството. Искаме нашата сватба да отрази всичко това.',
    liveGalleryEnabled: true,
    isOwner: false
  },
  {
    id: 'festive-celebration-demo',
    title: '🎉 ПАРТИ ЖИВОТЪТ ЗАПОЧВА! 🎉',
    description: 'Николай става на 30!',
    eventDate: '2024-05-18T19:00:00',
    location: 'Club Mansion, София',
    template: 'festive-celebration',
    coverPhoto: null,
    gallery: [],
    story: 'Време е за парти! 30-те идват само веднъж, така че ще ги посрещнем с шум и танци до зори! 🕺💃',
    liveGalleryEnabled: true,
    isOwner: false
  },
  {
    id: 'kids-wonderland-demo',
    title: '🎈 Мая става на 7! 🎈',
    description: 'Магическо парти в страната на приказките',
    eventDate: '2024-04-20T15:00:00', 
    location: 'Детски център "Дъгичка"',
    template: 'kids-wonderland',
    coverPhoto: null,
    gallery: [
      {
        id: '1',
        url: '/api/placeholder/600/400',
        caption: '🦄 Еднорози навсякъде!',
        isLive: false
      }
    ],
    story: '🌟 Мая обича еднорози, дъги и блестящи неща! Елате да направим рождения й ден най-магическия досега! 🦄✨',
    liveGalleryEnabled: true,
    isOwner: false
  }
]

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('classic-elegant')
  
  const currentEvent = sampleEvents.find(event => event.template === selectedTemplate)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🎨 Momentia Template Showcase
          </h1>
          <p className="text-gray-600 mb-6">
            Разгледайте нашите 6 професионални template-а за събития
          </p>
          
          {/* Template Selector */}
          <div className="flex flex-wrap gap-3">
            {[
              { id: 'classic-elegant', name: '✨ Classic Elegant', color: 'bg-amber-100 text-amber-800' },
              { id: 'baroque-luxury', name: '👑 Baroque Luxury', color: 'bg-red-100 text-red-800' },
              { id: 'minimalist-modern', name: '⚪ Minimalist Modern', color: 'bg-gray-100 text-gray-800' },
              { id: 'rustic-warmth', name: '🌿 Rustic Warmth', color: 'bg-green-100 text-green-800' },
              { id: 'festive-celebration', name: '🎉 Festive Celebration', color: 'bg-pink-100 text-pink-800' },
              { id: 'kids-wonderland', name: '🎈 Kids Wonderland', color: 'bg-purple-100 text-purple-800' }
            ].map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedTemplate === template.id
                    ? 'ring-2 ring-momentia-500 ' + template.color
                    : template.color + ' hover:opacity-80'
                }`}
              >
                {template.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Template Preview */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-800 text-white px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <div className="text-sm font-mono">
              {currentEvent?.template}.momentia.online
            </div>
          </div>
          
          <div className="min-h-screen">
            {currentEvent && (
              <EventTemplate eventData={currentEvent} />
            )}
          </div>
        </div>
      </div>

      {/* Template Info */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">
            📋 Template Specifications
          </h3>
          
          {selectedTemplate === 'classic-elegant' && (
            <div className="space-y-2 text-sm">
              <p><strong>Typography:</strong> Playfair Display (serif)</p>
              <p><strong>Colors:</strong> Warm White (#F8F6F0), Elegant Gold (#D4AF37), Warm Taupe (#8B7355)</p>
              <p><strong>Style:</strong> Изтънчена типография, generous whitespace, elegant gold accents</p>
              <p><strong>Best for:</strong> Formal weddings, anniversary celebrations, elegant events</p>
            </div>
          )}
          
          {selectedTemplate === 'baroque-luxury' && (
            <div className="space-y-2 text-sm">
              <p><strong>Typography:</strong> Bodoni MT (serif), uppercase headlines</p>
              <p><strong>Colors:</strong> Deep Burgundy (#8B0000), Rich Gold (#FFD700), Dark Chocolate (#2F1B14)</p>
              <p><strong>Style:</strong> Ornamental borders, luxury shadows, imperial feeling</p>
              <p><strong>Best for:</strong> Luxury weddings, high-end celebrations, VIP events</p>
            </div>
          )}
          
          {selectedTemplate === 'minimalist-modern' && (
            <div className="space-y-2 text-sm">
              <p><strong>Typography:</strong> Inter (sans-serif), clean lines</p>
              <p><strong>Colors:</strong> Pure White (#FFFFFF), Steel Blue (#2C3E50), Silver Gray (#95A5A6)</p>
              <p><strong>Style:</strong> Ultra generous spacing, sharp edges, architectural feel</p>
              <p><strong>Best for:</strong> Modern weddings, corporate events, art gallery openings</p>
            </div>
          )}
          
          {selectedTemplate === 'rustic-warmth' && (
            <div className="space-y-2 text-sm">
              <p><strong>Typography:</strong> Lora (serif), italic accents</p>
              <p><strong>Colors:</strong> Sage Green (#8FBC8F), Burlywood (#DEB887), Wheat (#F5DEB3)</p>
              <p><strong>Style:</strong> Natural textures, soft edges, wood grain patterns</p>
              <p><strong>Best for:</strong> Outdoor weddings, rustic venues, nature-themed events</p>
            </div>
          )}
          
          {selectedTemplate === 'festive-celebration' && (
            <div className="space-y-2 text-sm">
              <p><strong>Typography:</strong> Poppins (sans-serif), playful weights</p>
              <p><strong>Colors:</strong> Vibrant Pink (#FF6B9D), Mint Green (#A8E6CF), Sunny Yellow (#FFD93D)</p>
              <p><strong>Style:</strong> Gradient backgrounds, bounce animations, micro-interactions</p>
              <p><strong>Best for:</strong> Birthday parties, celebrations, fun events</p>
            </div>
          )}
          
          {selectedTemplate === 'kids-wonderland' && (
            <div className="space-y-2 text-sm">
              <p><strong>Typography:</strong> Fredoka One & Nunito (playful fonts)</p>
              <p><strong>Colors:</strong> Bubblegum Pink (#FF9FF3), Sky Blue (#54A0FF), Purple Magic (#5F27CD)</p>
              <p><strong>Style:</strong> Super rounded corners, child-safe design, playful illustrations</p>
              <p><strong>Best for:</strong> Children's birthdays, kids events, family gatherings</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}