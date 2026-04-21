"use client"

import { X, Scale, Cpu, HardDrive, MemoryStickIcon, Zap, MessageCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "./product-modal"

interface CompareDrawerProps {
  products: Product[]
  isOpen: boolean
  onClose: () => void
  onRemove: (product: Product) => void
  onClear: () => void
}

const iconMap = {
  cpu: Cpu,
  ram: MemoryStickIcon,
  storage: HardDrive,
  power: Zap,
}

export function CompareDrawer({ products, isOpen, onClose, onRemove, onClear }: CompareDrawerProps) {
  if (!isOpen) return null

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)

  const specLabels = ["cpu", "ram", "storage", "power"] as const

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-5xl max-h-[90vh] glass rounded-t-2xl sm:rounded-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Scale className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Compare Products</h3>
              <p className="text-sm text-muted-foreground">
                {products.length} of 3 items selected
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {products.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-2"
                onClick={onClear}
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </Button>
            )}
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 overflow-x-auto">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <Scale className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No products to compare. Add up to 3 products.
              </p>
            </div>
          ) : (
            <div className="min-w-max">
              {/* Product Headers */}
              <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}>
                <div className="p-4" />
                {products.map((product) => (
                  <div key={product.name} className="relative p-4 rounded-xl bg-secondary/30 border border-border">
                    <button
                      onClick={() => onRemove(product)}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center hover:bg-destructive/30 transition-colors"
                    >
                      <X className="w-3.5 h-3.5 text-destructive" />
                    </button>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 object-contain mb-3"
                    />
                    <h4 className="font-semibold text-foreground text-sm line-clamp-2 mb-1">
                      {product.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">{product.tagline}</p>
                    <Badge className="bg-primary/20 text-primary text-xs">
                      Grade {product.grade}
                    </Badge>
                  </div>
                ))}
              </div>

              {/* Price Row */}
              <div className="grid gap-4 mt-4 items-center" style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}>
                <div className="p-4 font-semibold text-foreground">Price</div>
                {products.map((product) => (
                  <div key={product.name} className="p-4 text-center">
                    <span className="text-xl font-bold text-primary glow-text">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Spec Rows */}
              {specLabels.map((specType) => {
                const Icon = iconMap[specType]
                const label = specType === "cpu" ? "Processor" : specType === "ram" ? "Memory" : specType === "storage" ? "Storage" : "Feature"
                return (
                  <div
                    key={specType}
                    className="grid gap-4 items-center border-t border-border/50"
                    style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}
                  >
                    <div className="p-4 flex items-center gap-2">
                      <Icon className="w-4 h-4 text-primary" />
                      <span className="font-medium text-foreground">{label}</span>
                    </div>
                    {products.map((product) => {
                      const spec = product.specs.find((s) => s.icon === specType)
                      return (
                        <div key={product.name} className="p-4 text-center">
                          <span className="text-sm text-muted-foreground font-mono">
                            {spec?.label || "-"}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )
              })}

              {/* Stock Status */}
              <div className="grid gap-4 items-center border-t border-border/50" style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}>
                <div className="p-4 font-medium text-foreground">Availability</div>
                {products.map((product) => (
                  <div key={product.name} className="p-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                      product.inStock 
                        ? "bg-green-500/20 text-green-400" 
                        : "bg-red-500/20 text-red-400"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? "bg-green-400" : "bg-red-400"}`} />
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Order Buttons */}
              <div className="grid gap-4 mt-4" style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}>
                <div className="p-4" />
                {products.map((product) => {
                  const whatsappMessage = `NEXUS_ORDER:_I_am_interested_in_the_${product.name.replace(/\s+/g, "_")}_priced_at_N${product.price.toLocaleString()}.__Please_confirm_availability_at_Iwo_Road.`
                  const whatsappLink = `https://wa.me/2348034436491?text=${whatsappMessage}`
                  return (
                    <div key={product.name} className="p-4">
                      <Button
                        asChild
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
                        disabled={!product.inStock}
                      >
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="w-4 h-4" />
                          Order
                        </a>
                      </Button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
