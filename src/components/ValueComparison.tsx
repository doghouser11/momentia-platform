const comparisons = [
  {
    scenario: 'Custom Website Development',
    traditional: {
      cost: '€1,500',
      time: '4-6 weeks',
      sites: '1 site only',
      rsvp: 'Basic form (€200 extra)',
      support: 'Limited after launch'
    },
    momentia: {
      cost: '€350/year',
      time: '5 minutes',
      sites: '3 professional sites',
      rsvp: 'Smart management included',
      support: 'Ongoing priority support'
    }
  },
  {
    scenario: 'Freelancer Website',
    traditional: {
      cost: '€500-800',
      time: '2-3 weeks',
      sites: '1 site',
      rsvp: 'Manual RSVP tracking',
      support: 'Pay per change'
    },
    momentia: {
      cost: '€180/year',
      time: 'Instant',
      sites: '2 sites + family sharing',
      rsvp: 'Automated reports & reminders',
      support: 'Self-service + email help'
    }
  }
]

export default function ValueComparison() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-elegant text-4xl font-bold text-gray-900 mb-4">
            Why Smart Event Hosts Choose Momentia
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compare the traditional way of creating event websites vs the Momentia way. 
            The savings in time and money are dramatic.
          </p>
        </div>
        
        <div className="space-y-16">
          {comparisons.map((comparison, index) => (
            <div key={index} className="max-w-6xl mx-auto">
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
                {comparison.scenario}
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Traditional Way */}
                <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">😤</span>
                    </div>
                    <h4 className="text-xl font-bold text-red-900">Traditional Way</h4>
                    <p className="text-red-700 text-sm">Expensive & Time-Consuming</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-red-200">
                      <span className="text-red-700 font-medium">Cost:</span>
                      <span className="text-red-900 font-bold">{comparison.traditional.cost}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-red-200">
                      <span className="text-red-700 font-medium">Time:</span>
                      <span className="text-red-900">{comparison.traditional.time}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-red-200">
                      <span className="text-red-700 font-medium">What you get:</span>
                      <span className="text-red-900">{comparison.traditional.sites}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-red-200">
                      <span className="text-red-700 font-medium">RSVP:</span>
                      <span className="text-red-900">{comparison.traditional.rsvp}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-red-700 font-medium">Support:</span>
                      <span className="text-red-900">{comparison.traditional.support}</span>
                    </div>
                  </div>
                </div>
                
                {/* Momentia Way */}
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                      BETTER CHOICE
                    </span>
                  </div>
                  
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">😊</span>
                    </div>
                    <h4 className="text-xl font-bold text-green-900">Momentia Way</h4>
                    <p className="text-green-700 text-sm">Smart & Affordable</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-green-200">
                      <span className="text-green-700 font-medium">Cost:</span>
                      <span className="text-green-900 font-bold">{comparison.momentia.cost}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-green-200">
                      <span className="text-green-700 font-medium">Time:</span>
                      <span className="text-green-900">{comparison.momentia.time}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-green-200">
                      <span className="text-green-700 font-medium">What you get:</span>
                      <span className="text-green-900">{comparison.momentia.sites}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-green-200">
                      <span className="text-green-700 font-medium">RSVP:</span>
                      <span className="text-green-900">{comparison.momentia.rsvp}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-green-700 font-medium">Support:</span>
                      <span className="text-green-900">{comparison.momentia.support}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Savings Highlight */}
              <div className="text-center mt-8">
                <div className="inline-flex items-center gap-3 bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full">
                  <span className="text-2xl">💰</span>
                  <span className="font-bold">
                    Save €{parseInt(comparison.traditional.cost.replace('€', '').replace('-800', '').replace(',500', '500')) - parseInt(comparison.momentia.cost.replace('€', '').replace('/year', ''))}+ 
                    and get {comparison.momentia.sites.includes('3') ? '3x' : '2x'} more value!
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* ROI Summary */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="bg-momentia-50 rounded-2xl p-8 text-center">
            <h3 className="text-3xl font-bold text-momentia-900 mb-4">
              The Smart Choice is Clear
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-momentia-800">
              <div>
                <div className="text-4xl font-bold mb-2">75%</div>
                <div className="text-sm">Less Expensive</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50x</div>
                <div className="text-sm">Faster Setup</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">3x</div>
                <div className="text-sm">More Sites</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}