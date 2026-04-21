"use client"

import { useState } from "react"
import { MessageCircle, X, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhatsAppConcierge() {
  const [isExpanded, setIsExpanded] = useState(false)

  const whatsappLink =
    "https://wa.me/2348034436491?text=Hello_SAMTOB!_I_need_live_tech_support._Please_assist_me."

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Panel */}
      {isExpanded && (
        <div className="absolute bottom-20 right-0 w-72 glass rounded-xl p-4 animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Headphones className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm">
                  Tech Concierge
                </h4>
                <p className="text-xs text-muted-foreground">
                  Online • Replies instantly
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-secondary/30 rounded-lg p-3 mb-3">
            <p className="text-sm text-foreground/80">
              👋 Welcome to SAMTOB! Need help finding the perfect laptop or phone?
              Our tech experts are ready to assist you.
            </p>
          </div>

          <Button
            asChild
            className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white gap-2"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4" />
              Start Chat
            </a>
          </Button>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] flex items-center justify-center shadow-lg transition-all duration-300 animate-pulse-glow"
        aria-label="Open WhatsApp Support"
      >
        <MessageCircle className="w-7 h-7 text-white" />

        {/* Notification Dot */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
          <span className="text-[10px] font-bold text-primary-foreground">1</span>
        </span>

        {/* Label */}
        <span className="absolute -left-28 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg glass text-xs font-medium text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden lg:block">
          Live Tech Support
        </span>
      </button>
    </div>
  )
}
