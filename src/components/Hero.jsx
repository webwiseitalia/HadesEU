import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import heroImage from '../assets/hadesEU-hero.webp'

export default function Hero() {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const statsRef = useRef(null)
  const imageRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current, statsRef.current], {
        opacity: 0,
        y: 60
      })
      gsap.set(imageRef.current, { scale: 1.2, opacity: 0 })
      gsap.set(overlayRef.current, { opacity: 0 })

      // Main timeline
      const tl = gsap.timeline({ delay: 0.2 })

      // Image reveal with scale
      tl.to(imageRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1.8,
        ease: 'power3.out'
      })

      // Overlay fade
      .to(overlayRef.current, {
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
      }, 0.3)

      // Title with split effect
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power4.out'
      }, 0.6)

      // Subtitle
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, 0.9)

      // CTA buttons
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, 1.1)

      // Stats with stagger
      .to(statsRef.current.children, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out'
      }, 1.3)

      // Floating animation for the image
      gsap.to(imageRef.current, {
        y: -20,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Parallax on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current || !imageRef.current) return

      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      const xPos = (clientX / innerWidth - 0.5) * 30
      const yPos = (clientY / innerHeight - 0.5) * 30

      gsap.to(imageRef.current, {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: 'power2.out'
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-hades-darker"
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imageRef}
          src={heroImage}
          alt="HadesEU"
          className="w-full h-full object-cover will-change-transform"
        />
      </div>

      {/* Gradient Overlays - più scuro per leggibilità */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-hades-darker"
      />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-noise" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Title */}
        <div ref={titleRef} className="mb-6">
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter">
            <span className="text-white">HADES</span>
            <span className="text-hades-purple">EU</span>
          </h1>
          <div className="text-2xl sm:text-3xl font-medium text-white/60 tracking-[0.3em] mt-2">
            STORE
          </div>
        </div>

        {/* Subtitle */}
        <p ref={subtitleRef} className="text-lg sm:text-xl text-white/50 max-w-md mx-auto mb-12 font-light">
          Premium Minecraft hosting. Exclusive ranks. Instant setup.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <a
            href="#hosting"
            className="group relative px-8 py-4 bg-hades-purple text-white font-semibold text-lg overflow-hidden rounded-lg"
          >
            <span className="relative z-10">View Hosting</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
          <a
            href="#ranks"
            className="px-8 py-4 border border-white/20 text-white font-semibold text-lg rounded-lg hover:bg-white/5 transition-colors duration-300"
          >
            Browse Ranks
          </a>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="flex items-center justify-center gap-12 sm:gap-20">
          <div className="text-center opacity-0">
            <div className="text-4xl sm:text-5xl font-black text-white">5K+</div>
            <div className="text-sm text-white/40 mt-1 uppercase tracking-wider">Players</div>
          </div>
          <div className="w-px h-12 bg-white/10" />
          <div className="text-center opacity-0">
            <div className="text-4xl sm:text-5xl font-black text-white">99.9%</div>
            <div className="text-sm text-white/40 mt-1 uppercase tracking-wider">Uptime</div>
          </div>
          <div className="w-px h-12 bg-white/10" />
          <div className="text-center opacity-0">
            <div className="text-4xl sm:text-5xl font-black text-white">24/7</div>
            <div className="text-sm text-white/40 mt-1 uppercase tracking-wider">Support</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white/40 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
