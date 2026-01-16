import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HostingPlans() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef(null)

  const plans = [
    {
      name: 'Starter',
      price: '4.99',
      description: 'For small servers',
      color: '#06b6d4',
      features: ['2 GB RAM', '10 GB SSD', '10 Players', 'Daily Backups', 'Control Panel'],
    },
    {
      name: 'Pro',
      price: '9.99',
      description: 'Most popular',
      color: '#a855f7',
      popular: true,
      features: ['4 GB RAM', '25 GB SSD', '25 Players', 'Priority Support', 'Custom Domain', 'Pre-installed Plugins'],
    },
    {
      name: 'Elite',
      price: '19.99',
      description: 'For communities',
      color: '#f97316',
      features: ['8 GB RAM', '50 GB NVMe', '50 Players', '24/7 Support', 'DDoS Protection', 'Premium Plugins'],
    },
    {
      name: 'Ultimate',
      price: '39.99',
      description: 'No limits',
      color: '#fbbf24',
      features: ['16 GB RAM', '100 GB NVMe', 'Unlimited Players', 'Dedicated Support', 'Everything Included'],
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
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

      // Cards animation
      const cardElements = cardsRef.current?.children
      if (cardElements) {
        gsap.fromTo(cardElements,
          { y: 60, opacity: 0 },
          {
            y: 0,
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
    <section ref={sectionRef} id="hosting" className="py-32 bg-hades-dark relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-hades-purple/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <span className="text-hades-purple text-sm font-semibold uppercase tracking-widest block">Hosting</span>
          <h2 className="text-5xl sm:text-6xl font-black text-white mt-4 mb-6">
            Pick your server
          </h2>
          <p className="text-lg text-white/50 max-w-md mx-auto">
            Instant setup. Full control. Scale anytime.
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`group relative bg-[#12121a] rounded-2xl border transition-all duration-500 hover:-translate-y-2 ${
                plan.popular ? 'border-hades-purple' : 'border-white/10 hover:border-white/20'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-hades-purple rounded-full text-xs font-semibold text-white">
                  POPULAR
                </div>
              )}

              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: `0 0 60px ${plan.color}20` }}
              />

              <div className="p-8 relative">
                {/* Plan name with colored dot */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: plan.color }} />
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                </div>
                <p className="text-white/40 text-sm mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-5xl font-black text-white">€{plan.price}</span>
                  <span className="text-white/40 text-sm">/mo</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-white/70 text-sm">
                      <svg className="w-4 h-4 flex-shrink-0" style={{ color: plan.color }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button
                  className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ backgroundColor: plan.color }}
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
