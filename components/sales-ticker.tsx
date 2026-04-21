"use client"

import { ShoppingBag, MapPin } from "lucide-react"
import { useEffect, useState } from "react"

const salesData = [
  { name: "Chinedu O.", product: "HP ZBook 15 G6", location: "Lagos", time: 2 },
  { name: "Aisha M.", product: "iPhone 13 Pro Max", location: "Ibadan", time: 5 },
  { name: "Emeka I.", product: "Dell XPS 15 9500", location: "Abuja", time: 8 },
  { name: "Fatima B.", product: "MacBook Pro 13\"", location: "Kano", time: 12 },
  { name: "Oluwaseun A.", product: "Samsung Galaxy S22", location: "Ibadan", time: 15 },
  { name: "Ngozi C.", product: "HP EliteBook x360", location: "Port Harcourt", time: 18 },
  { name: "Yusuf D.", product: "Lenovo ThinkPad X1", location: "Ilorin", time: 22 },
  { name: "Blessing E.", product: "iPhone 12", location: "Ibadan", time: 28 },
]

export function SalesTicker() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % salesData.length)
        setIsVisible(true)
      }, 500)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const sale = salesData[currentIndex]

  return (
    <div className="fixed top-20 left-4 z-30 max-w-xs">
      <div
        className={`glass rounded-xl p-4 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-5 h-5 text-green-400" />
          </div>
          <div className="min-w-0">
            <p className="text-sm text-foreground">
              <span className="font-semibold">{sale.name}</span> just ordered
            </p>
            <p className="text-sm font-semibold text-primary truncate">{sale.product}</p>
            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{sale.location}</span>
              <span className="mx-1">•</span>
              <span>{sale.time} mins ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
