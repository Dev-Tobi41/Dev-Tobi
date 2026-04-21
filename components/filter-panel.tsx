"use client"

import { SlidersHorizontal, X, ChevronDown } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export interface FilterState {
  brand: string[]
  priceRange: [number, number]
  ram: string[]
  storage: string[]
  inStock: boolean | null
}

interface FilterPanelProps {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  onReset: () => void
}

const brands = ["HP", "Dell", "Lenovo", "MacBook", "Samsung", "iPhone"]
const ramOptions = ["4GB", "8GB", "16GB", "32GB"]
const storageOptions = ["128GB", "256GB", "512GB", "1TB"]
const priceRanges: [number, number][] = [
  [0, 400000],
  [400000, 600000],
  [600000, 800000],
  [800000, 1000000],
]

export function FilterPanel({ filters, onFilterChange, onReset }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [openSections, setOpenSections] = useState<string[]>(["brand", "price"])

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    )
  }

  const toggleBrand = (brand: string) => {
    const newBrands = filters.brand.includes(brand)
      ? filters.brand.filter((b) => b !== brand)
      : [...filters.brand, brand]
    onFilterChange({ ...filters, brand: newBrands })
  }

  const toggleRam = (ram: string) => {
    const newRam = filters.ram.includes(ram)
      ? filters.ram.filter((r) => r !== ram)
      : [...filters.ram, ram]
    onFilterChange({ ...filters, ram: newRam })
  }

  const toggleStorage = (storage: string) => {
    const newStorage = filters.storage.includes(storage)
      ? filters.storage.filter((s) => s !== storage)
      : [...filters.storage, storage]
    onFilterChange({ ...filters, storage: newStorage })
  }

  const setPriceRange = (range: [number, number]) => {
    onFilterChange({ ...filters, priceRange: range })
  }

  const toggleStock = () => {
    const newValue = filters.inStock === true ? null : true
    onFilterChange({ ...filters, inStock: newValue })
  }

  const formatPrice = (price: number) =>
    price >= 1000000
      ? `${(price / 1000000).toFixed(1)}M`
      : `${(price / 1000).toFixed(0)}K`

  const activeFilterCount =
    filters.brand.length +
    filters.ram.length +
    filters.storage.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000000 ? 1 : 0) +
    (filters.inStock ? 1 : 0)

  return (
    <>
      {/* Mobile Filter Toggle */}
      <Button
        variant="outline"
        className="lg:hidden gap-2 border-border"
        onClick={() => setIsOpen(true)}
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters
        {activeFilterCount > 0 && (
          <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
      </Button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Filter Panel */}
      <div
        className={`fixed lg:static top-0 left-0 h-full lg:h-auto w-80 lg:w-64 glass lg:bg-transparent lg:backdrop-blur-none lg:border-0 z-50 lg:z-auto transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4 lg:p-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {activeFilterCount > 0 && (
                <button
                  onClick={onReset}
                  className="text-xs text-primary hover:underline"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
              >
                <X className="w-4 h-4 text-foreground" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Brand Filter */}
            <div className="border-b border-border/50 pb-4">
              <button
                onClick={() => toggleSection("brand")}
                className="w-full flex items-center justify-between py-2"
              >
                <span className="text-sm font-medium text-foreground">Brand</span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${
                    openSections.includes("brand") ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openSections.includes("brand") && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => toggleBrand(brand)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        filters.brand.includes(brand)
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary/50 text-foreground hover:bg-secondary"
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range */}
            <div className="border-b border-border/50 pb-4">
              <button
                onClick={() => toggleSection("price")}
                className="w-full flex items-center justify-between py-2"
              >
                <span className="text-sm font-medium text-foreground">Price Range</span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${
                    openSections.includes("price") ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openSections.includes("price") && (
                <div className="space-y-2 mt-2">
                  {priceRanges.map(([min, max]) => (
                    <button
                      key={`${min}-${max}`}
                      onClick={() => setPriceRange([min, max])}
                      className={`w-full px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors ${
                        filters.priceRange[0] === min && filters.priceRange[1] === max
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary/50 text-foreground hover:bg-secondary"
                      }`}
                    >
                      {formatPrice(min)} - {formatPrice(max)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RAM Filter */}
            <div className="border-b border-border/50 pb-4">
              <button
                onClick={() => toggleSection("ram")}
                className="w-full flex items-center justify-between py-2"
              >
                <span className="text-sm font-medium text-foreground">RAM</span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${
                    openSections.includes("ram") ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openSections.includes("ram") && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {ramOptions.map((ram) => (
                    <button
                      key={ram}
                      onClick={() => toggleRam(ram)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        filters.ram.includes(ram)
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary/50 text-foreground hover:bg-secondary"
                      }`}
                    >
                      {ram}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Storage Filter */}
            <div className="border-b border-border/50 pb-4">
              <button
                onClick={() => toggleSection("storage")}
                className="w-full flex items-center justify-between py-2"
              >
                <span className="text-sm font-medium text-foreground">Storage</span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${
                    openSections.includes("storage") ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openSections.includes("storage") && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {storageOptions.map((storage) => (
                    <button
                      key={storage}
                      onClick={() => toggleStorage(storage)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        filters.storage.includes(storage)
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary/50 text-foreground hover:bg-secondary"
                      }`}
                    >
                      {storage}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* In Stock Only */}
            <div className="pb-4">
              <button
                onClick={toggleStock}
                className="w-full flex items-center justify-between py-2"
              >
                <span className="text-sm font-medium text-foreground">In Stock Only</span>
                <div
                  className={`w-10 h-6 rounded-full transition-colors relative ${
                    filters.inStock ? "bg-primary" : "bg-secondary"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full bg-foreground transition-transform ${
                      filters.inStock ? "translate-x-5" : "translate-x-1"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
