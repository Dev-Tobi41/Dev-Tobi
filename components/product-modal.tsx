"use client"

import { X, Cpu, HardDrive, MemoryStickIcon, Zap, MessageCircle, Scale, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

interface ProductSpec {
  icon: "cpu" | "ram" | "storage" | "power"
  label: string
}

export interface Product {
  name: string
  tagline: string
  price: number
  image: string
  specs: ProductSpec[]
  grade?: string
  inStock?: boolean
}

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onCompare: (product: Product) => void
  isInCompare: boolean
}

const iconMap = {
  cpu: Cpu,
  ram: MemoryStickIcon,
  storage: HardDrive,
  power: Zap,
}

export function ProductModal({ product, isOpen, onClose, onCompare, isInCompare }: ProductModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  if (!isOpen || !product) return null

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(product.price)

  const whatsappMessage = `NEXUS_ORDER:_I_am_interested_in_the_${product.name.replace(/\s+/g, "_")}_priced_at_N${product.price.toLocaleString()}.__Please_confirm_availability_at_Iwo_Road.`
  const whatsappLink = `https://wa.me/2348034436491?text=${whatsappMessage}`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-3xl glass rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center hover:bg-secondary transition-colors"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative h-64 md:h-full bg-secondary/30 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-8"
            />
            
            {/* Grade Badge */}
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary text-primary-foreground font-mono text-sm px-3 py-1.5">
                Grade {product.grade}
              </Badge>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8 flex flex-col">
            {/* Header */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    product.inStock ? "bg-green-400 animate-pulse" : "bg-red-400"
                  }`}
                />
                <span className="text-sm text-muted-foreground font-mono">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-1">{product.name}</h2>
              <p className="text-muted-foreground">{product.tagline}</p>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-3xl font-bold text-primary glow-text">
                {formattedPrice}
              </span>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {product.specs.map((spec, index) => {
                const Icon = iconMap[spec.icon]
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border/50"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {spec.label}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Features */}
            <div className="space-y-2 mb-6 flex-1">
              <p className="text-sm font-semibold text-foreground">Included:</p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  90-day warranty
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  Original charger included
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  Free delivery within Ibadan
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Button
                asChild
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 h-12 glow-cyan"
                disabled={!product.inStock}
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />
                  Secure Order via WhatsApp
                </a>
              </Button>
              
              <Button
                variant="outline"
                className="w-full gap-2 h-11 border-border hover:bg-secondary/50"
                onClick={() => onCompare(product)}
              >
                <Scale className="w-4 h-4" />
                {isInCompare ? "Remove from Compare" : "Add to Compare"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
