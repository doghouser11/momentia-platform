const plans = [
  {
    name: 'Начинаещ',
    price: '180',
    currency: '€',
    period: 'година',
    description: 'Перфектно за двойки и малки семейства',
    features: [
      '2 сайта за събития годишно',
      'Умно управление на RSVP', 
      'Автоматични имейл отчети',
      'Основни напомняния',
      'Всичките 5 шаблона',
      'Мобилно responsive',
      'Споделяне с семейството',
      'Имейл поддръжка'
    ],
    popular: false,
    cta: 'Започни сега',
    savings: 'Спестяване спрямо €300+ статични сайтове'
  },
  {
    name: 'Премиум',
    price: '350',
    currency: '€', 
    period: 'година',
    description: 'Най-популярен за активни семейства',
    features: [
      '3 сайта за събития годишно',
      'Всичко от Начинаещ',
      'Умно планиране на напомняния',
      'Персонализирани домейни (вашасватба.com)',
      'Фото галерии и качвания',
      'Live снимки от гости по време на събитието',
      'Приоритетна поддръжка',
      'Разширена персонализация',
      'Подробна аналитика',
      'RSVP експорт (CSV/PDF)'
    ],
    popular: true,
    cta: 'Избери Премиум',
    savings: 'Спестяване спрямо €1,500 фрийлансър'
  },
  {
    name: 'Професионален',
    price: '500',
    currency: '€',
    period: 'година', 
    description: 'За агенции и професионални организатори',
    features: [
      '5 сайта за събития годишно',
      'Всичко от Премиум',
      'Видео качвания и галерии',
      'White-label брандинг',
      'Разширено аналитично табло',
      'API достъп за интеграции',
      'Персонален акаунт мениджър',
      'Приоритет при нови функции',
      'Групови операции',
      'Персонализиран CSS',
      'Достъп до партньорска програма'
    ],
    popular: false,
    cta: 'Стани професионалист',
    savings: 'Спестяване спрямо €2,500+ персонална разработка'
  }
]

export default function Pricing() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-elegant text-4xl font-bold text-gray-900 mb-4">
            Премиум качество, честна цена
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Сравни: Персонални сайтове за събития струват €300-500 всеки. С Моментия получаваш 2-5 професионални сайта 
            с умно RSVP управление за част от цената. Плюс споделяне със семейството!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.name} className={`card relative ${
              plan.popular 
                ? 'ring-2 ring-momentia-500 shadow-2xl scale-105' 
                : 'hover:shadow-xl'
            } transition-all duration-300`}>
              
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-momentia-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Най-популярен
                  </span>
                </div>
              )}
              
              <div className="text-center">
                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                {/* Price */}
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-lg text-gray-600 ml-1">{plan.currency}</span>
                  <div className="text-sm text-gray-500">на {plan.period}</div>
                </div>
                
                {/* CTA Button */}
                <button className={`w-full mb-4 py-3 px-6 rounded-full font-medium transition-all duration-200 ${
                  plan.popular
                    ? 'bg-momentia-500 hover:bg-momentia-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}>
                  {plan.cta}
                </button>
                
                {/* Savings Badge */}
                <div className="text-xs text-center text-green-600 font-medium mb-4">
                  💰 {plan.savings}
                </div>
                
                {/* Features List */}
                <div className="space-y-3 text-left">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="text-green-500 text-sm mt-1 flex-shrink-0">✓</span>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Children's Birthday Special - Coming Soon */}
        <div className="mt-16 text-center">
          <div className="max-w-md mx-auto card bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200">
            <div className="text-center">
              <div className="text-4xl mb-3">🎈</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Детски Рождени Дни</h3>
              <p className="text-gray-600 text-sm mb-4">Специален план за най-малките гости</p>
              
              <div className="space-y-2 text-left text-sm text-gray-600 mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-pink-500 text-xs mt-1">✓</span>
                  <span>Детско-безопасни RSVP форми</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-pink-500 text-xs mt-1">✓</span>
                  <span>Известяване на родителите</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-pink-500 text-xs mt-1">✓</span>
                  <span>Планиране на активности</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-pink-500 text-xs mt-1">✓</span>
                  <span>Магически Kids Wonderland шаблон</span>
                </div>
              </div>
              
              <button disabled className="w-full py-2 px-4 rounded-full bg-gray-100 text-gray-500 text-sm font-medium cursor-not-allowed">
                Скоро достъпно
              </button>
              
              <p className="text-xs text-gray-500 mt-2">
                Ценообразуването се финализира
              </p>
            </div>
          </div>
        </div>

        {/* Money-back Guarantee */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-gray-600">
            <span className="text-green-500 text-xl">🛡️</span>
            <span>30-дневна гаранция за връщане на парите</span>
          </div>
        </div>
      </div>
    </section>
  )
}