const templates = [
  {
    id: 'classic-elegant',
    name: 'Classic Elegant',
    category: 'Wedding',
    image: '/templates/classic-elegant.jpg',
    colors: ['#f8f6f0', '#d4af37', '#8b7355'],
    features: ['Smart RSVP Tracking', 'Guest Management', 'Event Timeline', 'Photo Gallery'],
    description: 'Timeless elegance for traditional celebrations'
  },
  {
    id: 'baroque-luxury',
    name: 'Baroque Luxury',
    category: 'Wedding',
    image: '/templates/baroque-luxury.jpg',
    colors: ['#8b0000', '#ffd700', '#2f1b14'],
    features: ['RSVP Dashboard', 'Guest Status Updates', 'Ornate Details', 'Premium Layout'],
    description: 'Opulent design for grand celebrations'
  },
  {
    id: 'minimalist-modern',
    name: 'Minimalist Modern',
    category: 'Multi-Event',
    image: '/templates/minimalist-modern.jpg',
    colors: ['#ffffff', '#2c3e50', '#95a5a6'],
    features: ['Clean RSVP Forms', 'Mobile-First Design', 'Simple Navigation', 'Fast Loading'],
    description: 'Clean, contemporary style for any occasion'
  },
  {
    id: 'rustic-warmth',
    name: 'Rustic Warmth',
    category: 'Wedding',
    image: '/templates/rustic-warmth.jpg',
    colors: ['#8fbc8f', '#deb887', '#f5deb3'],
    features: ['Cozy RSVP Experience', 'Natural Elements', 'Photo Stories', 'Venue Integration'],
    description: 'Warm, natural feel for outdoor events'
  },
  {
    id: 'festive-celebration',
    name: 'Festive Celebration',
    category: 'Birthday',
    image: '/templates/festive-celebration.jpg',
    colors: ['#ff6b9d', '#a8e6cf', '#ffd93d'],
    features: ['Fun RSVP Process', 'Interactive Elements', 'Colorful Design', 'Party Planning'],
    description: 'Vibrant design for joyful occasions'
  },
  {
    id: 'kids-wonderland',
    name: 'Kids Wonderland',
    category: 'Kids Birthday',
    image: '/templates/kids-wonderland.jpg',
    colors: ['#ff9ff3', '#54a0ff', '#5f27cd'],
    features: ['Child-Safe RSVP Forms', 'Parent Notifications', 'Activity Planning', 'Photo Adventures'],
    description: 'Magical design specially created for children\'s celebrations'
  }
]

export default function Templates() {
  return (
    <section className="py-20 gradient-bg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-elegant text-4xl font-bold text-gray-900 mb-4">
            Most Popular Event Styles
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            5 carefully selected templates based on what couples and hosts love most. 
            Each one optimized for maximum RSVP response rates.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div key={template.id} className="card group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              {/* Template Preview */}
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br" style={{
                  background: `linear-gradient(135deg, ${template.colors[0]} 0%, ${template.colors[1]} 50%, ${template.colors[2]} 100%)`
                }}>
                </div>
                <div className="relative z-10 text-center">
                  <div className="text-6xl mb-2">
                    {template.category === 'Wedding' ? '💒' : 
                     template.category === 'Birthday' ? '🎂' :
                     template.category === 'Kids Birthday' ? '🎈' :
                     template.category === 'Baptism' ? '🕊️' :
                     template.category === 'Corporate' ? '🏢' :
                     template.category === 'Anniversary' ? '💖' : '🎉'}
                  </div>
                  <div className="text-sm font-medium text-gray-700">Preview</div>
                </div>
              </div>
              
              {/* Template Info */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{template.name}</h3>
                  <span className="text-sm bg-momentia-100 text-momentia-700 px-2 py-1 rounded-full">
                    {template.category}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                
                {/* Color Palette */}
                <div className="flex gap-2 mb-4">
                  {template.colors.map((color, index) => (
                    <div 
                      key={index}
                      className="w-6 h-6 rounded-full border border-gray-300"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
                
                {/* Features */}
                <div className="space-y-1 text-sm text-gray-600">
                  {template.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-green-500 text-xs">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-4 btn-secondary group-hover:btn-primary transition-all duration-300">
                  Preview Template
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* More Templates Coming */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">More templates added weekly!</p>
          <div className="text-4xl">🎨 ✨ 🚀</div>
        </div>
      </div>
    </section>
  )
}