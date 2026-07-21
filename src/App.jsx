import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhySection from './components/WhySection'
import HowSection from './components/HowSection'
import ForYouSection from './components/ForYouSection'
import CTASection from './components/CTASection'
import FAQSection from './components/FAQSection'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <WhySection />
        <HowSection />
        <ForYouSection />
        <CTASection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
