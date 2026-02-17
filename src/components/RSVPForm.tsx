'use client'

import { useState } from 'react'

interface RSVPFormProps {
  eventId: string
  eventTitle: string
  eventDate: string
}

export default function RSVPForm({ eventId, eventTitle, eventDate }: RSVPFormProps) {
  const [formData, setFormData] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    status: '',
    plusOnes: 0,
    dietaryNotes: '',
    message: ''
  })
  
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.guestName || !formData.status) {
      setError('Моля попълнете име и потвърдете присъствието си.')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const response = await fetch(`/api/events/${eventId}/rsvp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        const data = await response.json()
        setError(data.error || 'Възникна грешка при записването.')
      }
    } catch (err) {
      setError('Възникна грешка. Моля опитайте отново.')
    } finally {
      setSubmitting(false)
    }
  }

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Благодарим ви!
        </h2>
        <p className="text-gray-600 mb-6">
          Вашият отговор е записан успешно. 
          {formData.status === 'COMING' && ' Радваме се да ви видим!'}
          {formData.status === 'MAYBE' && ' Ще ви напомним по-близо до датата.'}
          {formData.status === 'NOT_COMING' && ' Съжаляваме, че няма да можете да дойдете.'}
        </p>
        
        {formData.status === 'COMING' && (
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-800">
              📅 Запишете си датата: <strong>{new Date(eventDate).toLocaleDateString('bg-BG')}</strong>
            </p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Потвърждение за присъствие
        </h2>
        <p className="text-gray-600">
          {eventTitle}
        </p>
        <p className="text-sm text-gray-500">
          {new Date(eventDate).toLocaleDateString('bg-BG', {
            weekday: 'long',
            year: 'numeric', 
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Име и фамилия *
          </label>
          <input
            type="text"
            value={formData.guestName}
            onChange={(e) => updateField('guestName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-momentia-500 focus:border-transparent"
            placeholder="Вашето пълно име"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Имейл
          </label>
          <input
            type="email"
            value={formData.guestEmail}
            onChange={(e) => updateField('guestEmail', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-momentia-500 focus:border-transparent"
            placeholder="email@example.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Телефон
          </label>
          <input
            type="tel"
            value={formData.guestPhone}
            onChange={(e) => updateField('guestPhone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-momentia-500 focus:border-transparent"
            placeholder="+359 88 123 4567"
          />
        </div>

        {/* RSVP Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ще присъствате? *
          </label>
          <div className="space-y-2">
            {[
              { value: 'COMING', label: '✅ Да, ще дойдем', color: 'text-green-600' },
              { value: 'MAYBE', label: '🤔 Може би', color: 'text-yellow-600' },
              { value: 'NOT_COMING', label: '❌ Не, няма да можем', color: 'text-red-600' }
            ].map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value={option.value}
                  checked={formData.status === option.value}
                  onChange={(e) => updateField('status', e.target.value)}
                  className="mr-3"
                  required
                />
                <span className={`${option.color} font-medium`}>
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Plus Ones */}
        {formData.status === 'COMING' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Допълнителни гости
            </label>
            <select
              value={formData.plusOnes}
              onChange={(e) => updateField('plusOnes', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-momentia-500 focus:border-transparent"
            >
              <option value={0}>Само аз</option>
              <option value={1}>+ 1 човек</option>
              <option value={2}>+ 2 души</option>
              <option value={3}>+ 3 души</option>
              <option value={4}>+ 4+ души</option>
            </select>
          </div>
        )}

        {/* Dietary Notes */}
        {formData.status === 'COMING' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Специални изисквания за храна
            </label>
            <textarea
              value={formData.dietaryNotes}
              onChange={(e) => updateField('dietaryNotes', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-momentia-500 focus:border-transparent"
              rows={2}
              placeholder="Алергии, вегетариански, веган..."
            />
          </div>
        )}

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Съобщение (дигитална книга за гости)
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => updateField('message', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-momentia-500 focus:border-transparent"
            rows={3}
            placeholder="Оставете пожелание или съобщение..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-momentia-500 hover:bg-momentia-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Записва се...' : 'Потвърди присъствието'}
        </button>
      </form>
    </div>
  )
}