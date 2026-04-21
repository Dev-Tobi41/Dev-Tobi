import { Shield, Leaf, Wrench, Award } from "lucide-react"

const trustFeatures = [
  {
    icon: Award,
    title: "Grade A++ Guarantee",
    description:
      "Every device undergoes 50+ quality checkpoints. Premium UK-used laptops with verified authenticity.",
  },
  {
    icon: Leaf,
    title: "Battery Recycling Program",
    description:
      "Eco-conscious tech ownership. We responsibly recycle old batteries and offer trade-in discounts.",
  },
  {
    icon: Wrench,
    title: "Expert Repairs",
    description:
      "In-house certified technicians for all laptop and phone repairs. 6-month warranty on all services.",
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description:
      "Safe WhatsApp ordering with instant confirmation. Pay on delivery available in Ibadan.",
  },
]

export function TrustProtocol() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <span className="text-xs font-mono text-primary tracking-widest uppercase">
          Trust Protocol
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
          Why Choose SAMTOB?
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Over 10 years of excellence in tech retail across Southwest Nigeria.
          Your satisfaction is our signature.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trustFeatures.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div
              key={index}
              className="glass rounded-xl p-6 text-center group hover:glow-cyan transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
