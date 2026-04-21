"use client"

import { ArrowRight, MessageCircle, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Gradient Overlays */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-foreground">
              Ibadan&apos;s #1 Tech Hub Since 2013
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <span className="block text-balance">Premium Tech,</span>
            <span className="block text-primary glow-text">Instant Delivery</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 text-pretty">
            Grade A++ UK-used laptops and smartphones. One-tap WhatsApp ordering
            with same-day delivery across Ibadan.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan text-lg px-8 gap-2"
            >
              <a
                href="https://wa.me/2348034436491?text=Hello_SAMTOB!_Show_me_your_latest_laptop_deals."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5" />
                Shop via WhatsApp
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary/50 text-foreground hover:bg-primary/10 text-lg px-8 gap-2"
            >
              <a href="#laptops">
                View Catalog
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary glow-text">
                5K+
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground font-mono">
                Happy Clients
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary glow-text">
                10+
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground font-mono">
                Years Active
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary glow-text">
                4
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground font-mono">
                Locations
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-muted-foreground font-mono tracking-widest uppercase">
          Scroll to Explore
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  )
}
