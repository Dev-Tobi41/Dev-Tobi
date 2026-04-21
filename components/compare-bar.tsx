"use client"

import { Scale, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "./product-modal"

interface CompareBarProps {
  products: Product[]
  onRemove: (product: Product) => void
  onCompare: () => void
}

export function CompareBar({ products, onRemove, onCompare }: CompareBarProps) {
  if (products.length === 0) return null

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 animate-in slide-in-from-bottom duration-300">
      <div className="glass rounded-full px-4 py-3 flex items-center gap-4 glow-cyan">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-foreground">
            {products.length}/3
          </span>
        </div>

        <div className="flex items-center gap-2">
          {products.map((product) => (
            <div
              key={product.name}
              className="relative group"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-10 h-10 rounded-lg object-contain bg-secondary/50 p-1"
              />
              <button
                onClick={() => onRemove(product)}
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-2.5 h-2.5 text-destructive-foreground" />
              </button>
            </div>
          ))}
          {Array.from({ length: 3 - products.length }).map((_, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-lg border-2 border-dashed border-border/50"
            />
          ))}
        </div>

        <Button
          size="sm"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
          onClick={onCompare}
          disabled={products.length < 2}
        >
          Compare
        </Button>
      </div>
    </div>
  )
}
