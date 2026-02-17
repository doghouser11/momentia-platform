'use client'

import { useState, useEffect } from 'react'

interface RSVPStats {
  total: number
  coming: number
  maybe: number
  notComing: number
  noResponse: number
  totalAttendees: number
}

interface Guest {
  id: string
  name: string
  email: string
  status: 'COMING' | 'MAYBE' | 'NOT_COMING' | 'NO_RESPONSE'
  plusOnes: number
  message?: string
  respondedAt?: string
  dietaryNotes?: string
}

interface RSVPStatsProps {
  eventId: string
  eventTitle: string
  eventDate: string
  isOwner: boolean
}

export default function RSVPStats({ eventId, eventTitle, eventDate, isOwner }: RSVPStatsProps) {
  const [stats, setStats] = useState<RSVPStats | null>(null)
  const [guests, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (isOwner) {
      fetchRSVPData()
    }
  }, [eventId, isOwner])

  const fetchRSVPData = async () => {
    try {
      const response = await fetch(`/api/events/${eventId}/rsvp`)
      const data = await response.json()
      
      setStats(data.stats)
      setGuests(data.guests || [])
    } catch (error) {
      console.error('Failed to fetch RSVP data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOwner) {
    return null
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMING': return 'text-green-600 bg-green-100'
      case 'MAYBE': return 'text-yellow-600 bg-yellow-100'
      case 'NOT_COMING': return 'text-red-600 bg-red-100'
      case 'NO_RESPONSE': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'COMING': return 'Идва'
      case 'MAYBE': return 'Може би'
      case 'NOT_COMING': return 'Не идва'
      case 'NO_RESPONSE': return 'Без отговор'
      default: return status
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Не е отговорил'
    return new Date(dateString).toLocaleDateString('bg-BG', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-momentia-500 to-momentia-600 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">📊 RSVP Статистики</h2>
        <p className="opacity-90">{eventTitle}</p>
        <p className="text-sm opacity-75">
          {new Date(eventDate).toLocaleDateString('bg-BG', {
            weekday: 'long',
            year: 'numeric',
            month: 'long', 
            day: 'numeric'
          })}
        </p>
      </div>

      {/* Stats Overview */}
      {stats && (
        <div className="p-6 border-b">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.coming}</div>
              <div className="text-sm text-gray-600">Идват</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.maybe}</div>
              <div className="text-sm text-gray-600">Може би</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{stats.notComing}</div>
              <div className="text-sm text-gray-600">Не идват</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">{stats.noResponse}</div>
              <div className="text-sm text-gray-600">Без отговор</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-momentia-600">{stats.totalAttendees}</div>
              <div className="text-sm text-gray-600">Общо участници</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Процент отговорили</span>
              <span>{Math.round(((stats.total - stats.noResponse) / stats.total) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-momentia-500 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${((stats.total - stats.noResponse) / stats.total) * 100}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'overview', label: '📋 Преглед', count: stats?.total },
            { id: 'coming', label: '✅ Идват', count: stats?.coming },
            { id: 'maybe', label: '🤔 Може би', count: stats?.maybe },
            { id: 'messages', label: '💭 Съобщения', count: guests.filter(g => g.message).length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-momentia-500 text-momentia-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label} ({tab.count || 0})
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {guests.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Все още няма отговори от гости
              </div>
            ) : (
              guests.map(guest => (
                <div key={guest.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{guest.name}</div>
                    <div className="text-sm text-gray-500">{guest.email}</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {guest.plusOnes > 0 && (
                      <span className="text-sm text-gray-600">+{guest.plusOnes}</span>
                    )}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(guest.status)}`}>
                      {getStatusLabel(guest.status)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(guest.respondedAt)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'coming' && (
          <div className="space-y-4">
            {guests.filter(g => g.status === 'COMING').map(guest => (
              <div key={guest.id} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium text-gray-900">{guest.name}</div>
                    <div className="text-sm text-gray-500">{guest.email}</div>
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    Общо: {1 + guest.plusOnes} {guest.plusOnes > 0 ? 'души' : 'човек'}
                  </div>
                </div>
                {guest.dietaryNotes && (
                  <div className="text-sm text-gray-600 mt-2">
                    <strong>Диета:</strong> {guest.dietaryNotes}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'maybe' && (
          <div className="space-y-4">
            {guests.filter(g => g.status === 'MAYBE').map(guest => (
              <div key={guest.id} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="font-medium text-gray-900">{guest.name}</div>
                <div className="text-sm text-gray-500">{guest.email}</div>
                <div className="text-xs text-yellow-600 mt-1">
                  Ще получи напомняне 7 дни преди събитието
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-4">
            {guests.filter(g => g.message).map(guest => (
              <div key={guest.id} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium text-gray-900">{guest.name}</div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(guest.status)}`}>
                    {getStatusLabel(guest.status)}
                  </span>
                </div>
                <div className="text-gray-700 italic">"{guest.message}"</div>
                <div className="text-xs text-gray-500 mt-2">
                  {formatDate(guest.respondedAt)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="bg-gray-50 px-6 py-4">
        <div className="flex space-x-3">
          <button className="btn-secondary text-sm">
            📧 Изпрати напомняния
          </button>
          <button className="btn-secondary text-sm">
            📊 Експорт данни
          </button>
          <button className="btn-secondary text-sm">
            📋 Копирай списък
          </button>
        </div>
      </div>
    </div>
  )
}