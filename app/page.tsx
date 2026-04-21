import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProductCard } from "@/components/product-card"
import { BranchSelector } from "@/components/branch-selector"
import { TrustProtocol } from "@/components/trust-protocol"
import { WhatsAppConcierge } from "@/components/whatsapp-concierge"
import { Laptop, Smartphone, Phone, MapPin, Clock } from "lucide-react"
// Replace with your Strapi URL and API Token
const STRAPI_URL = "https://onrender.com";
const STRAPI_TOKEN = "your_api_token_here";

async function getProducts() {
  const res = await fetch(`${STRAPI_URL}/api/products?populate=*`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    next: { revalidate: 60 } // Updates your site every 60 seconds
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  const result = await res.json();
  return result.data;
}
export default async function ProductGallery() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10">
      {products.map((product: any) => (
        <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm">
          {/* Display the Image from Strapi */}
          <img
            src={`${STRAPI_URL}${product.attributes.image.data.attributes.url}`}
            alt={product.attributes.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-bold">{product.attributes.name}</h2>
            <p className="text-green-600 font-semibold">${product.attributes.price}</p>
            <p className="text-gray-600 text-sm mt-2">{product.attributes.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}


const laptops = [
  {
    name: "HP ZBook 15 G6",
    tagline: "Workstation Beast",
    price: 800000,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80",
    specs: [
      { icon: "cpu" as const, label: "i7 9th Gen" },
      { icon: "ram" as const, label: "32GB RAM" },
      { icon: "storage" as const, label: "512GB SSD" },
      { icon: "power" as const, label: "Quadro T1000" },
    ],
    grade: "A++",
    inStock: true,
  },
  {
    name: "HP EliteBook x360 1030 G7",
    tagline: "Convertible Executive",
    price: 620000,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
    specs: [
      { icon: "cpu" as const, label: "i5 10th Gen" },
      { icon: "ram" as const, label: "16GB RAM" },
      { icon: "storage" as const, label: "256GB SSD" },
      { icon: "power" as const, label: "Touch 360°" },
    ],
    grade: "A+",
    inStock: true,
  },
  {
    name: "Dell XPS 15 9500",
    tagline: "Creative Powerhouse",
    price: 750000,
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
    specs: [
      { icon: "cpu" as const, label: "i7 10th Gen" },
      { icon: "ram" as const, label: "16GB RAM" },
      { icon: "storage" as const, label: "512GB SSD" },
      { icon: "power" as const, label: "GTX 1650" },
    ],
    grade: "A++",
    inStock: true,
  },
  {
    name: "Lenovo ThinkPad X1 Carbon",
    tagline: "Business Ultrabook",
    price: 580000,
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&q=80",
    specs: [
      { icon: "cpu" as const, label: "i5 8th Gen" },
      { icon: "ram" as const, label: "8GB RAM" },
      { icon: "storage" as const, label: "256GB SSD" },
      { icon: "power" as const, label: "1.1kg" },
    ],
    grade: "A",
    inStock: false,
  },
  {
    name: "HP ProBook 450 G7",
    tagline: "Budget Professional",
    price: 380000,
    image: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=600&q=80",
    specs: [
      { icon: "cpu" as const, label: "i5 10th Gen" },
      { icon: "ram" as const, label: "8GB RAM" },
      { icon: "storage" as const, label: "256GB SSD" },
      { icon: "power" as const, label: "15.6\"" },
    ],
    grade: "A+",
    inStock: true,
  },
  {
    name: "MacBook Pro 13\" M1",
    tagline: "Apple Silicon",
    price: 920000,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
    specs: [
      { icon: "cpu" as const, label: "M1 Chip" },
      { icon: "ram" as const, label: "8GB RAM" },
      { icon: "storage" as const, label: "256GB SSD" },
      { icon: "power" as const, label: "20hr Battery" },
    ],
    grade: "A++",
    inStock: true,
  },
]

const phones = [
  {
    name: "iPhone 13 Pro Max",
    tagline: "Flagship Experience",
    price: 650000,
    image: "https://images.unsplash.com/photo-1632661674596-df8be59a8e31?w=600&q=80",
    specs: [
      { icon: "cpu" as const, label: "A15 Bionic" },
      { icon: "ram" as const, label: "6GB RAM" },
      { icon: "storage" as const, label: "256GB" },
      { icon: "power" as const, label: "ProMotion" },
    ],
    grade: "A++",
    inStock: true,
  },
  {
    name: "Samsung Galaxy S22 Ultra",
    tagline: "Android Premium",
    price: 580000,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80",
    specs: [
      { icon: "cpu" as const, label: "Snapdragon 8" },
      { icon: "ram" as const, label: "12GB RAM" },
      { icon: "storage" as const, label: "256GB" },
      { icon: "power" as const, label: "S Pen" },
    ],
    grade: "A+",
    inStock: true,
  },
  {
    name: "iPhone 12",
    tagline: "Classic Power",
    price: 420000,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80",
    specs: [
      { icon: "cpu" as const, label: "A14 Bionic" },
      { icon: "ram" as const, label: "4GB RAM" },
      { icon: "storage" as const, label: "128GB" },
      { icon: "power" as const, label: "5G" },
    ],
    grade: "A",
    inStock: true,
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />

      {/* Laptops Section */}
      <section id="laptops" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Laptop className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Premium Laptops
            </h2>
            <p className="text-sm text-muted-foreground">
              UK-used, Grade A++ verified devices
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {laptops.map((laptop, index) => (
            <ProductCard key={index} {...laptop} />
          ))}
        </div>
      </section>

      {/* Phones Section */}
      <section id="phones" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Mobile Phones
            </h2>
            <p className="text-sm text-muted-foreground">
              iPhones & Androids at unbeatable prices
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {phones.map((phone, index) => (
            <ProductCard key={index} {...phone} />
          ))}
        </div>
      </section>

      {/* Trust Protocol */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <TrustProtocol />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-mono text-primary tracking-widest uppercase">
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Visit Our Showrooms
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Walk in for hands-on experience or order via WhatsApp for instant
            delivery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Branch Selector */}
          <BranchSelector />

          {/* Contact Card */}
          <div className="glass rounded-xl p-6 space-y-6">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              Quick Contact
            </h3>

            <div className="space-y-4">
              <a
                href="tel:+2348034436491"
                className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Call Us</p>
                  <p className="text-sm text-muted-foreground">
                    +234 803 443 6491
                  </p>
                </div>
              </a>

              <a
                href="https://maps.google.com/?q=7.4022,3.9434"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Main Branch</p>
                  <p className="text-sm text-muted-foreground">
                    Iwo Road, beside Bishop Phillips Academy
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Business Hours</p>
                  <p className="text-sm text-muted-foreground">
                    Mon - Sat: 8:00 AM - 7:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">S</span>
            </div>
            <span className="text-sm text-muted-foreground">
              © 2024 SAMTOB P&C. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-muted-foreground">
              SEO: Best UK used laptops Iwo Road | Cheap HP Laptops Ibadan |
              SAMTOB Laptop Repairs
            </span>
          </div>
        </div>
      </footer>

      {/* WhatsApp Concierge */}
      <WhatsAppConcierge />
    </main>
  )
}
