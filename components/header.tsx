"use client"

import { useState } from "react"
import { Menu, X, Laptop, Smartphone, Wrench, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "Laptops", href: "#laptops", icon: Laptop },
  { label: "Phones", href: "#phones", icon: Smartphone },
  { label: "Repairs", href: "#repairs", icon: Wrench },
  { label: "Contact", href: "#contact", icon: Phone },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-foreground">SAMTOB</span>
              <span className="text-xs text-primary ml-1 font-mono">P&C</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan"
            >
              <a
                href="https://wa.me/2348034436491?text=Hello_SAMTOB!_I_want_to_place_an_order."
                target="_blank"
                rel="noopener noreferrer"
              >
                Order Now
              </a>
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass border-t border-border animate-in slide-in-from-top-2 fade-in duration-200">
          <nav className="p-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-foreground hover:bg-secondary/50 transition-colors"
              >
                <link.icon className="w-5 h-5 text-primary" />
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <Button
                asChild
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <a
                  href="https://wa.me/2348034436491?text=Hello_SAMTOB!_I_want_to_place_an_order."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Order Now
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
