"use client"

import { useState } from "react"
import { MapPin, Phone, Clock, Navigation, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Branch {
  id: string
  name: string
  address: string
  landmark: string
  phone: string
  hours: string
  isMain: boolean
  mapsLink: string
}

const branches: Branch[] = [
  {
    id: "iwo-road",
    name: "Iwo Road (Flagship)",
    address: "Beside Bishop Phillips Academy, Iwo Road",
    landmark: "Opposite First Bank",
    phone: "+234 803 443 6491",
    hours: "Mon-Sat: 8AM - 7PM",
    isMain: true,
    mapsLink: "https://maps.google.com/?q=7.4022,3.9434",
  },
  {
    id: "mokola",
    name: "Mokola",
    address: "45 Mokola Roundabout, Ibadan",
    landmark: "Near UCH Junction",
    phone: "+234 803 443 6492",
    hours: "Mon-Sat: 9AM - 6PM",
    isMain: false,
    mapsLink: "https://maps.google.com/?q=7.4095,3.9062",
  },
  {
    id: "challenge",
    name: "Challenge",
    address: "12 Challenge Road, Ibadan",
    landmark: "By Challenge Roundabout",
    phone: "+234 803 443 6493",
    hours: "Mon-Sat: 9AM - 6PM",
    isMain: false,
    mapsLink: "https://maps.google.com/?q=7.3553,3.8861",
  },
  {
    id: "ilorin",
    name: "Ilorin",
    address: "78 Unity Road, GRA, Ilorin",
    landmark: "Opposite Shoprite",
    phone: "+234 803 443 6494",
    hours: "Mon-Sat: 9AM - 6PM",
    isMain: false,
    mapsLink: "https://maps.google.com/?q=8.4799,4.5418",
  },
]

export function BranchSelector() {
  const [selectedBranch, setSelectedBranch] = useState(branches[0])
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-primary" />
        Our Locations
      </h3>

      {/* Branch Dropdown */}
      <div className="relative mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">
              {selectedBranch.name}
            </span>
            {selectedBranch.isMain && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-primary/20 text-primary">
                MAIN
              </span>
            )}
          </div>
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 glass rounded-lg overflow-hidden z-10 animate-in slide-in-from-top-2 fade-in duration-200">
            {branches.map((branch) => (
              <button
                key={branch.id}
                onClick={() => {
                  setSelectedBranch(branch)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center justify-between p-3 text-left hover:bg-secondary/50 transition-colors ${
                  selectedBranch.id === branch.id ? "bg-secondary/30" : ""
                }`}
              >
                <span className="text-sm text-foreground">{branch.name}</span>
                {branch.isMain && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-primary/20 text-primary">
                    MAIN
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected Branch Details */}
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-sm text-foreground">{selectedBranch.address}</p>
            <p className="text-xs text-muted-foreground">
              {selectedBranch.landmark}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Phone className="w-4 h-4 text-primary shrink-0" />
          <a
            href={`tel:${selectedBranch.phone.replace(/\s/g, "")}`}
            className="text-sm text-foreground hover:text-primary transition-colors"
          >
            {selectedBranch.phone}
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="w-4 h-4 text-primary shrink-0" />
          <span className="text-sm text-foreground">{selectedBranch.hours}</span>
        </div>

        <Button
          asChild
          variant="outline"
          className="w-full mt-2 border-primary/50 text-primary hover:bg-primary/10 gap-2"
        >
          <a href={selectedBranch.mapsLink} target="_blank" rel="noopener noreferrer">
            <Navigation className="w-4 h-4" />
            Get Directions
          </a>
        </Button>
      </div>
    </div>
  )
}
