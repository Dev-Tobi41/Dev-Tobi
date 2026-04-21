"use client"

import { Cpu, HardDrive, MemoryStickIcon, Zap, MessageCircle, Eye, Scale } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Product } from "./product-modal"

interface ProductCardProps extends Product {
  onQuickView: (product: Product) => void
  onCompare: (product: Product) => void
  isInCompare: boolean
}

const iconMap = {
  cpu: Cpu,
  ram: MemoryStickIcon,
  storage: HardDrive,
  power: Zap,
}

export function ProductCard({
  name,
  tagline,
  price,
  image,
  specs,
  grade = "A++",
  inStock = true,
  onQuickView,
  onCompare,
  isInCompare,
}: ProductCardProps) {
  const product: Product = { name, tagline, price, image, specs, grade, inStock }

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price)

  const whatsappMessage = `NEXUS_ORDER:_I_am_interested_in_the_${name.replace(/\s+/g, "_")}_priced_at_N${price.toLocaleString()}.__Please_confirm_availability_at_Iwo_Road.`
  const whatsappLink = `https://wa.me/2348034436491?text=${whatsappMessage}`

  return (
    <div className="group relative glass rounded-xl overflow-hidden transition-all duration-300 hover:glow-cyan">
      {/* Grade Badge */}
      <div className="absolute top-4 left-4 z-10">
        <Badge className="bg-primary text-primary-foreground font-mono text-xs px-2 py-1">
          Grade {grade}
        </Badge>
      </div>

      {/* Stock Status */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${
              inStock ? "bg-green-400 animate-pulse" : "bg-red-400"
            }`}
          />
          <span className="text-xs text-muted-foreground font-mono">
            {inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      {/* Product Image */}
      <div className="relative h-48 bg-secondary/30 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/80" />
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
        />

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={() => onQuickView(product)}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors glow-cyan"
            aria-label="Quick view"
          >
            <Eye className="w-5 h-5 text-primary-foreground" />
          </button>
          <button
            onClick={() => onCompare(product)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isInCompare 
                ? "bg-primary glow-cyan" 
                : "bg-secondary hover:bg-secondary/80"
            }`}
            aria-label={isInCompare ? "Remove from compare" : "Add to compare"}
          >
            <Scale className={`w-5 h-5 ${isInCompare ? "text-primary-foreground" : "text-foreground"}`} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-1">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">{tagline}</p>

        {/* Spec Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {specs.map((spec, index) => {
            const Icon = iconMap[spec.icon]
            return (
              <div
                key={index}
                className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-secondary/50 border border-border/50"
              >
                <Icon className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-mono text-foreground/80">
                  {spec.label}
                </span>
              </div>
            )
          })}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-primary glow-text">
              {formattedPrice}
            </span>
          </div>
        </div>

        {/* WhatsApp Order Button */}
        <Button
          asChild
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 glow-cyan"
          disabled={!inStock}
        >
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-4 h-4" />
            Secure Order
          </a>
        </Button>
      </div>
    </div>
  )
}
