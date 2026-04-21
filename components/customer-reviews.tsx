"use client"

import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

const reviews = [
  {
    name: "Adebayo Oluwaseun",
    role: "Software Developer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    rating: 5,
    text: "Best laptop dealer in Ibadan! Got my HP ZBook at an unbeatable price. The Grade A++ quality is real - looks brand new. Delivered same day via WhatsApp order.",
    product: "HP ZBook 15 G6",
    date: "2 weeks ago",
  },
  {
    name: "Chioma Nwankwo",
    role: "Business Owner",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    rating: 5,
    text: "I&apos;ve bought 5 laptops from SAMTOB for my staff. Every single one has been excellent. Their battery recycling program is a bonus - very eco-conscious!",
    product: "Dell XPS 15 (x5)",
    date: "1 month ago",
  },
  {
    name: "Ibrahim Musa",
    role: "Content Creator",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    rating: 5,
    text: "My MacBook Pro M1 runs like a dream. SAMTOB&apos;s 90-day warranty gave me peace of mind. When I had a minor issue, their repair team fixed it in hours.",
    product: "MacBook Pro 13\" M1",
    date: "3 weeks ago",
  },
  {
    name: "Funke Adeyemi",
    role: "Medical Student",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    rating: 4,
    text: "Great prices and genuine UK-used quality. The Iwo Road branch is easy to find. Only wish they had more MacBook options in stock.",
    product: "HP EliteBook x360",
    date: "1 week ago",
  },
  {
    name: "Emeka Okonkwo",
    role: "Entrepreneur",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
    rating: 5,
    text: "The WhatsApp ordering system is genius! Sent a message, got specs confirmation, and had my iPhone 13 Pro Max delivered within 3 hours. Top class service.",
    product: "iPhone 13 Pro Max",
    date: "5 days ago",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  )
}

export function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrev = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const review = reviews[currentIndex]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-xs font-mono text-primary tracking-widest uppercase">
          Testimonials
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
          What Our Customers Say
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join thousands of satisfied customers across Nigeria
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Quote Icon */}
        <Quote className="absolute -top-6 -left-4 w-16 h-16 text-primary/20" />

        {/* Review Card */}
        <div className="glass rounded-2xl p-8 md:p-12 text-center">
          {/* Avatar */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <img
              src={review.avatar}
              alt={review.name}
              className="w-full h-full rounded-full object-cover border-4 border-primary/30"
            />
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-green-500 border-2 border-card flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Rating */}
          <div className="flex justify-center mb-4">
            <StarRating rating={review.rating} />
          </div>

          {/* Review Text */}
          <p className="text-lg text-foreground mb-6 leading-relaxed">
            &quot;{review.text}&quot;
          </p>

          {/* Product Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Purchased: {review.product}
          </div>

          {/* Author */}
          <div className="mt-4">
            <p className="font-semibold text-foreground">{review.name}</p>
            <p className="text-sm text-muted-foreground">{review.role} • {review.date}</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={goToPrev}
            className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-secondary transition-colors"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsAutoPlaying(false)
                  setCurrentIndex(i)
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentIndex
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-secondary transition-colors"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  )
}
