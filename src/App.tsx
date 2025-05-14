"use client"
import Hero from "./components/Hero"
import About from "./components/About"
import Projects from "./components/Projects"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"

function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
      </main>
      <Footer />
    </div>
  )
}

export default App
