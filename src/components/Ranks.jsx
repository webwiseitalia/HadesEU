import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Ranks() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef(null)

  const ranks = [
    {
      name: 'VIP',
      price: '9.99',
      color: '#06b6d4',
      gradient: 'from-cyan-500 to-cyan-600',
      features: ['[VIP] tag', '2 extra homes', '/fly in lobby', 'Daily kit', '5% discount'],
    },
    {
      name: 'VIP+',
      price: '19.99',
      color: '#a855f7',
      gradient: 'from-purple-500 to-purple-600',
      features: ['[VIP+] animated', '5 homes', '/fly everywhere', 'Custom pet', '10% discount'],
    },
    {
      name: 'MVP',
      price: '34.99',
      color: '#f97316',
      gradient: 'from-orange-500 to-orange-600',
      features: ['[MVP] effects', '10 homes', '/fly + /speed', 'Legendary pet', '15% discount', 'Particles'],
    },
    {
      name: 'MVP+',
      price: '49.99',
      color: '#fbbf24',
      gradient: 'from-yellow-500 to-amber-500',
      features: ['[MVP+] legendary', 'Unlimited homes', 'All commands', 'Mythic pet', '20% discount', 'Beta access'],
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headerElements = headerRef.current?.children
      if (headerElements) {
        gsap.fromTo(headerElements,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
            }
          }
        )
      }

      const cardElements = cardsRef.current?.children
      if (cardElements) {
        gsap.fromTo(cardElements,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
            }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="ranks" className="py-32 bg-[#08080c] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-hades-orange/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <span className="text-hades-orange text-sm font-semibold uppercase tracking-widest block">Ranks</span>
          <h2 className="text-5xl sm:text-6xl font-black text-white mt-4 mb-6">
            Stand out
          </h2>
          <p className="text-lg text-white/50 max-w-md mx-auto">
            Permanent perks. Lifetime access.
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ranks.map((rank) => (
            <div
              key={rank.name}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-[#12121a] rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-white/20 hover:-translate-y-2">
                {/* Top gradient bar */}
                <div className={`h-1 bg-gradient-to-r ${rank.gradient}`} />

                {/* Content */}
                <div className="p-8">
                  {/* Rank name */}
                  <div className="mb-6">
                    <h3
                      className="text-3xl font-black mb-1"
                      style={{ color: rank.color }}
                    >
                      {rank.name}
                    </h3>
                    <span className="text-xs text-white/40 uppercase tracking-widest">Lifetime</span>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <span className="text-4xl font-black text-white">€{rank.price}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {rank.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-white/60 text-sm">
                        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: rank.color }} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <button
                    className="w-full py-3 rounded-xl font-semibold text-white/90 border transition-all duration-300 hover:bg-white/5"
                    style={{ borderColor: `${rank.color}50` }}
                  >
                    Get Rank
                  </button>
                </div>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 60px ${rank.color}15` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-16 text-center">
          <p className="text-white/40 text-sm">
            Ranks stack — upgrade anytime, pay the difference.
          </p>
        </div>
      </div>
    </section>
  )
}
