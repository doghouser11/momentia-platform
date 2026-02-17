import Hero from '@/components/Hero'
import Features from '@/components/Features'
import LivePhotoUpload from '@/components/LivePhotoUpload'
import HowItWorks from '@/components/HowItWorks'
import ValueComparison from '@/components/ValueComparison'
import Templates from '@/components/Templates'
import Pricing from '@/components/Pricing'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="gradient-bg min-h-screen">
      <Hero />
      <Features />
      <LivePhotoUpload />
      <HowItWorks />
      <ValueComparison />
      <Templates />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  )
}