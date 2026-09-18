import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Work from './components/Work'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useLenis } from './lib/useLenis'

export default function App() {
  useLenis()

  return (
    <div>
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Work />
      <Skills />
      <Experience />
      <Achievements />
      <Contact />
      <Footer />
    </div>
  )
}
