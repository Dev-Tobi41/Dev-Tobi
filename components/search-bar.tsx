"use client"

import { Search, X } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import type { Product } from "./product-modal"

interface SearchBarProps {
  products: Product[]
  onSelect: (product: Product) => void
}

export function SearchBar({ products, onSelect }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<Product[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (query.length >= 2) {
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.tagline.toLowerCase().includes(query.toLowerCase()) ||
          p.specs.some((s) => s.label.toLowerCase().includes(query.toLowerCase()))
      )
      setResults(filtered)
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query, products])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (product: Product) => {
    onSelect(product)
    setQuery("")
    setIsOpen(false)
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search laptops, phones..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          className="w-full h-11 pl-10 pr-10 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("")
              inputRef.current?.focus()
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            <X className="w-3 h-3 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 glass rounded-xl overflow-hidden max-h-80 overflow-y-auto z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {results.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No products found for &quot;{query}&quot;
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {results.map((product) => (
                <button
                  key={product.name}
                  onClick={() => handleSelect(product)}
                  className="w-full p-3 flex items-center gap-3 hover:bg-secondary/50 transition-colors text-left"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-contain bg-secondary/30"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{product.tagline}</p>
                  </div>
                  <span className="text-sm font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
