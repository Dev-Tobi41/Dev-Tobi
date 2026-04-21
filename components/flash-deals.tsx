"use client"

import { Zap, Clock, MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface FlashDeal {
  name: string
  originalPrice: number
  salePrice: number
  image: string
  endsAt: Date
}

const deals: FlashDeal[] = [
  {
    name: "HP ProBook 450 G7",
    originalPrice: 420000,
    salePrice: 380000,
    image: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=600&q=80",
    endsAt: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
  },
  {
    name: "iPhone 12 128GB",
    originalPrice: 480000,
    salePrice: 420000,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80",
    endsAt: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
  },
]

function useCountdown(endDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const diff = endDate.getTime() - Date.now()
      if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 }
      return {
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      }
    }

    setTimeLeft(calculateTimeLeft())
    const interval = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)
    return () => clearInterval(interval)
  }, [endDate])

  return timeLeft
}

function FlashDealCard({ deal }: { deal: FlashDeal }) {
  const timeLeft = useCountdown(deal.endsAt)
  const discount = Math.round(((deal.originalPrice - deal.salePrice) / deal.originalPrice) * 100)

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)

  const whatsappMessage = `FLASH_DEAL:_I_want_the_${deal.name.replace(/\s+/g, "_")}_at_the_flash_sale_price_of_N${deal.salePrice.toLocaleString()}.__Please_confirm_availability.`
  const whatsappLink = `https://wa.me/2348034436491?text=${whatsappMessage}`

  return (
    <div className="glass rounded-xl overflow-hidden group">
      <div className="relative">
        {/* Discount Badge */}
        <div className="absolute top-3 left-3 z-10 bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-xs font-bold">
          -{discount}%
        </div>

        {/* Image */}
        <div className="h-40 bg-secondary/30 flex items-center justify-center">
          <img
            src={deal.image}
            alt={deal.name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      <div className="p-4">
        <h4 className="font-semibold text-foreground text-sm mb-2 line-clamp-1">{deal.name}</h4>

        {/* Prices */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-primary">{formatPrice(deal.salePrice)}</span>
          <span className="text-sm text-muted-foreground line-through">{formatPrice(deal.originalPrice)}</span>
        </div>

        {/* Countdown */}
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-destructive" />
          <div className="flex items-center gap-1 font-mono text-sm">
            <span className="bg-secondary px-2 py-1 rounded text-foreground">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="text-muted-foreground">:</span>
            <span className="bg-secondary px-2 py-1 rounded text-foreground">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="text-muted-foreground">:</span>
            <span className="bg-secondary px-2 py-1 rounded text-foreground">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Order Button */}
        <Button
          asChild
          size="sm"
          className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground gap-2"
        >
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-4 h-4" />
            Grab Deal
          </a>
        </Button>
      </div>
    </div>
  )
}

export function FlashDeals() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center animate-pulse">
          <Zap className="w-5 h-5 text-destructive" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Flash Deals</h2>
          <p className="text-sm text-muted-foreground">Limited time offers - Grab before they expire!</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {deals.map((deal, index) => (
          <FlashDealCard key={index} deal={deal} />
        ))}
      </div>
    </section>
  )
}
