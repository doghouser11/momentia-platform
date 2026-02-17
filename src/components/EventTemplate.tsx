'use client'

import { useState, useEffect } from 'react'
import RSVPForm from './RSVPForm'
import RSVPStats from './RSVPStats'

interface EventData {
  id: string
  title: string
  description?: string
  eventDate: string
  location?: string
  mapLink?: string
  template: string
  coverPhoto?: string | null
  gallery: EventPhoto[]
  story?: string
  liveGalleryEnabled: boolean
  isOwner?: boolean
  guestName?: string
}

interface EventPhoto {
  id: string
  url: string
  caption?: string
  isLive: boolean
  uploadedBy?: string
}

interface EventTemplateProps {
  eventData: EventData
}

export default function EventTemplate({ eventData }: EventTemplateProps) {
  const [showRSVP, setShowRSVP] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const templateClass = `template-${eventData.template}`
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('bg-BG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handlePhotoNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentPhotoIndex(prev => 
        prev === 0 ? eventData.gallery.length - 1 : prev - 1
      )
    } else {
      setCurrentPhotoIndex(prev => 
        prev === eventData.gallery.length - 1 ? 0 : prev + 1
      )
    }
  }

  return (
    <div className={`event-template ${templateClass}`}>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="title">{eventData.title}</h1>
          
          {eventData.template === 'baroque-luxury' && <div className="ornament"></div>}
          {eventData.template === 'rustic-warmth' && <div className="branch-decoration"></div>}
          {eventData.template === 'kids-wonderland' && <div className="fun-shape"></div>}
          
          <p className="subtitle date">
            📅 {formatDate(eventData.eventDate)}
          </p>
          
          {eventData.location && (
            <p className="location">
              📍 {eventData.location}
              {eventData.mapLink && (
                <a 
                  href={eventData.mapLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="map-link"
                >
                  (Вижте картата)
                </a>
              )}
            </p>
          )}

          {eventData.description && (
            <p className="subtitle description">
              {eventData.description}
            </p>
          )}

          <button 
            className="rsvp-button"
            onClick={() => setShowRSVP(true)}
          >
            {eventData.template === 'kids-wonderland' ? '🎉 Потвърди присъствие' : 
             eventData.template === 'festive-celebration' ? '🎊 RSVP сега!' :
             eventData.template === 'baroque-luxury' ? 'ПОТВЪРЖДЕНИЕ' :
             'Потвърди присъствие'}
          </button>
        </div>

        {eventData.coverPhoto && (
          <div className="hero-image">
            <img 
              src={eventData.coverPhoto} 
              alt={eventData.title}
              className="cover-photo"
            />
          </div>
        )}
      </section>

      {/* Story Section */}
      {eventData.story && (
        <section className="story-section">
          <div className="container">
            <h2>Нашата история</h2>
            <div className="story-content">
              <p>{eventData.story}</p>
            </div>
          </div>
        </section>
      )}

      {/* Photo Gallery */}
      {eventData.gallery.length > 0 && (
        <section className="gallery-section">
          <div className="container">
            <h2>
              Галерия
              {eventData.liveGalleryEnabled && (
                <span className="live-indicator">🔴 LIVE</span>
              )}
            </h2>
            
            <div className="gallery">
              {eventData.gallery.length === 1 ? (
                <div className="single-photo">
                  <img 
                    src={eventData.gallery[0].url} 
                    alt={eventData.gallery[0].caption || 'Снимка от събитието'}
                  />
                  {eventData.gallery[0].caption && (
                    <p className="photo-caption">{eventData.gallery[0].caption}</p>
                  )}
                </div>
              ) : (
                <div className="gallery-carousel">
                  <button 
                    className="gallery-nav prev" 
                    onClick={() => handlePhotoNavigation('prev')}
                  >
                    ‹
                  </button>
                  
                  <div className="photo-container">
                    <img 
                      src={eventData.gallery[currentPhotoIndex].url}
                      alt={eventData.gallery[currentPhotoIndex].caption || 'Снимка от събитието'}
                    />
                    {eventData.gallery[currentPhotoIndex].caption && (
                      <p className="photo-caption">
                        {eventData.gallery[currentPhotoIndex].caption}
                      </p>
                    )}
                  </div>
                  
                  <button 
                    className="gallery-nav next" 
                    onClick={() => handlePhotoNavigation('next')}
                  >
                    ›
                  </button>
                  
                  <div className="photo-indicators">
                    {eventData.gallery.map((_, index) => (
                      <button
                        key={index}
                        className={`indicator ${index === currentPhotoIndex ? 'active' : ''}`}
                        onClick={() => setCurrentPhotoIndex(index)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {eventData.liveGalleryEnabled && (
              <div className="live-gallery-info">
                <p>
                  📸 Гостите могат да качват снимки директно в галерията по време на събитието!
                  <br />
                  <small>Снимките се пазят 7 дни след края на събитието.</small>
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* RSVP Stats (Owner View) */}
      {eventData.isOwner && (
        <RSVPStats 
          eventId={eventData.id}
          eventTitle={eventData.title}
          eventDate={eventData.eventDate}
          isOwner={true}
        />
      )}

      {/* RSVP Modal */}
      {showRSVP && (
        <div className="rsvp-modal">
          <div className="modal-backdrop" onClick={() => setShowRSVP(false)} />
          <div className="modal-content">
            <button 
              className="modal-close"
              onClick={() => setShowRSVP(false)}
            >
              ✕
            </button>
            <RSVPForm 
              eventId={eventData.id}
              eventTitle={eventData.title}
              eventDate={eventData.eventDate}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="event-footer">
        <div className="container">
          <p className="powered-by">
            Създадено с ❤️ от{' '}
            <a href="https://momentia.online" target="_blank" rel="noopener noreferrer">
              Momentia
            </a>
          </p>
          
          {eventData.template === 'kids-wonderland' && (
            <div className="footer-decorations">
              🎈 🌟 🎨 🎪 🦄
            </div>
          )}
          
          {eventData.template === 'festive-celebration' && (
            <div className="footer-decorations animate-bounce">
              🎉 🎊 🥳 💃 🕺
            </div>
          )}
        </div>
      </footer>
    </div>
  )
}