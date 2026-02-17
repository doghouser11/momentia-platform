export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-elegant text-4xl font-bold text-gray-900 mb-4">
            Как Работи?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Организирането на събитие е приключение, а аз съм тук, за да ти спестя багажа. 
            Ето как правим магията в momentia.online:
          </p>
        </div>
        
        <div className="space-y-16">
          {/* ✨ Три празника, един абонамент */}
          <div className="card bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
            <div className="flex items-start gap-6">
              <div className="text-6xl">✨</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Три празника, един абонамент
                </h3>
                <p className="text-gray-700 mb-4 text-lg">
                  Животът не се случва само веднъж в годината. Затова ти давам <strong>3 лични сайта за период от 12 месеца</strong>. 
                  Сватба през лятото? Кръщене през есента? Рожден ден през зимата? 
                  Вече имаш готов дом за всяко от тях.
                </p>
                <p className="text-momentia-600 font-semibold">
                  Ти решаваш кога да ги „запалиш".
                </p>
              </div>
            </div>
          </div>

          {/* 🤖 Confirmy система */}
          <div className="card bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
            <div className="flex items-start gap-6">
              <div className="text-6xl">🤖</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Моя собствена Confirmy система – Край на „А ти ще идваш ли?"
                </h3>
                <p className="text-gray-700 mb-6 text-lg">
                  Забрави за безкрайните обаждания и изгубените съобщения във Viber. 
                  Твоите гости потвърждават присъствието си с един клик.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Удобство</h4>
                    <p className="text-sm text-gray-600">Те виждат локацията и менюто</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">😌</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Комфорт</h4>
                    <p className="text-sm text-gray-600">Ти виждаш точния брой гости в реално време</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🔔</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Напомняне</h4>
                    <p className="text-sm text-gray-600">„Потвърди-Ми" дискретно подсеща разсеяните приятели</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 📸 Живи Спомени */}
          <div className="card bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
            <div className="flex items-start gap-6">
              <div className="text-6xl">📸</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Живи Спомени (Live Gallery)
                </h3>
                <p className="text-gray-700 mb-4 text-lg">
                  <em>Допълнителна услуга за най-запалените.</em> Искаш ли да видиш сватбата през очите на гостите си? 
                  Активирай „Живи Спомени" и всеки може да качва снимки в сайта ти директно по време на събитието.
                </p>
                
                <div className="bg-white/70 rounded-lg p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-amber-500 font-bold">⚠️</span>
                    <div>
                      <p className="font-semibold text-gray-900">Важно:</p>
                      <p className="text-sm text-gray-600">Снимките стоят в облака 7 дни след купона – точно колкото да ги свалите и да си ги спомняте.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 font-bold">🧹</span>
                    <div>
                      <p className="font-semibold text-gray-900">Чисто начало:</p>
                      <p className="text-sm text-gray-600">Ако решиш да използваш следващия си сайт от пакета по-рано, старата галерия се изтрива автоматично, за да освободи място за новите емоции.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 📍 Всичко на едно място */}
          <div className="card bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
            <div className="flex items-start gap-6">
              <div className="text-6xl">📍</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Всичко на едно място
                </h3>
                <p className="text-gray-700 text-lg">
                  Карта с точната локация (без лутане!), график на деня и дори „списък с желания" за подаръци. 
                  <strong className="text-momentia-600"> Гостите ти ще те обожават, защото всичко важно е в джоба им.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Готов за следващото си незабравимо събитие?
          </p>
          <button className="btn-primary text-lg px-8 py-4">
            Започни Сега
          </button>
        </div>
      </div>
    </section>
  )
}