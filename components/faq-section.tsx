"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "What does \"UK-used\" mean?",
    answer: "UK-used refers to pre-owned laptops and phones originally purchased and used in the United Kingdom. These devices are typically well-maintained due to the UK's strict consumer regulations and are graded based on their condition. Our Grade A++ devices look and perform like new.",
  },
  {
    question: "Do you offer warranty on your products?",
    answer: "Yes! All our laptops come with a 90-day warranty covering hardware defects and battery issues. Phones come with a 30-day warranty. Extended warranty options are available at checkout via WhatsApp.",
  },
  {
    question: "How does the WhatsApp ordering work?",
    answer: "Simply click the 'Secure Order' button on any product. This opens WhatsApp with a pre-filled message containing the product details. Our sales team will confirm availability, arrange payment, and schedule delivery - all within the chat!",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept bank transfers, cash on delivery (within Ibadan), POS payments at our stores, and mobile money (Opay, Palmpay, etc.). For high-value items, we offer flexible payment plans.",
  },
  {
    question: "Do you deliver outside Ibadan?",
    answer: "Absolutely! We deliver nationwide via trusted logistics partners. Delivery within Ibadan is same-day (and often free for orders above N300,000). Other cities typically receive orders within 24-48 hours.",
  },
  {
    question: "Can I trade in my old laptop or phone?",
    answer: "Yes, we have a trade-in program! Bring your old device to any of our branches for assessment. We'll give you a fair value that can be applied toward your new purchase.",
  },
  {
    question: "What's the Battery Recycling Program?",
    answer: "We're committed to sustainability. Bring in any dead laptop battery and we'll recycle it responsibly - plus give you N2,000 off your next battery purchase. Help us keep Ibadan green!",
  },
  {
    question: "Do you repair laptops and phones?",
    answer: "Yes! Our certified technicians handle screen replacements, battery swaps, motherboard repairs, data recovery, and software issues. Walk-ins welcome at all branches, or book a repair slot online.",
  },
]

function FAQItem({ question, answer, isOpen, onToggle }: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left"
      >
        <span className="font-medium text-foreground pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-muted-foreground leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-primary" />
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Got questions? We&apos;ve got answers. If you can&apos;t find what you&apos;re looking for, chat with us on WhatsApp!
        </p>
      </div>

      <div className="glass rounded-xl p-6 md:p-8">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </section>
  )
}
