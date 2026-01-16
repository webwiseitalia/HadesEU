import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HostingPlans from './components/HostingPlans'
import Ranks from './components/Ranks'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-hades-dark">
      <Navbar />
      <Hero />
      <HostingPlans />
      <Ranks />
      <FAQ />
      <Footer />
    </div>
  )
}

export default App
