import Navbar from '../components/landing/Navbar'
import Hero from '../components/landing/Hero'
import SpacesSection from '../components/landing/SpacesSection'
import StatsBar from '../components/landing/StatsBar'
import WhySection from '../components/landing/WhySection'
import CTABanner from '../components/landing/CTABanner'
import Footer from '../components/landing/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-14">
        <Hero />
        <SpacesSection />
        <StatsBar />
        <WhySection />
        <CTABanner />
      </main>
      <Footer />
    </div>
  )
}
