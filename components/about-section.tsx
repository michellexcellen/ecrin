"use client"

import { useState } from "react"
import Image from "next/image"
import { MapPin, Users, Star, Sparkles, Home, Heart, Images, LucideIcon } from "lucide-react"
import GalleryModal from "./gallery-modal"
import type { HomePageAbout, SanityImage, HomePageGalleryImage } from "@/lib/sanity"
import { urlFor } from "@/lib/sanity"

// Mapping des icônes
const iconMap: Record<string, LucideIcon> = {
  MapPin,
  Users,
  Star,
  Sparkles,
  Home,
  Heart,
}

// Valeurs par défaut
const defaultAbout: HomePageAbout = {
  badge: "En quelques mots",
  title: "Un écrin de douceur sur la Route des Vins",
  description1: "Niché au cœur du village de Wettolsheim, notre gîte vous accueille dans un cadre enchanteur avec des vues imprenables sur le vignoble, le village et la Forêt Noire. Situé au premier étage avec entrée indépendante, dans un parc de 2500 m² au calme absolu.",
  description2: "Tout a été pensé pour votre confort : climatisation Daikin haut de gamme, WiFi fibre très haut débit, linge de maison fourni, lits faits à votre arrivée. Le ménage de fin de séjour et la taxe de séjour sont inclus.",
  highlights: [
    { icon: "MapPin", label: "Emplacement idéal", desc: "À 5km de Colmar" },
    { icon: "Users", label: "4 personnes max", desc: "Idéal en famille" },
    { icon: "Star", label: "Haut de gamme", desc: "Prestations luxe" },
    { icon: "Sparkles", label: "Jacuzzi inclus", desc: "Ouvert toute l'année" },
  ],
  galleryButtonText: "Afficher toutes les photos",
}

// Images par défaut (locales)
const defaultGalleryImages = [
  { src: "/images/salon.webp", alt: "Salon lumineux avec poutres en bois et canapé confortable" },
  { src: "/images/cuisine.jpeg", alt: "Cuisine moderne équipée avec hublot design" },
  { src: "/images/chambre1.jpeg", alt: "Chambre cosy avec lit double et éclairage tamisé" },
  { src: "/images/jaccuzi2.jpeg", alt: "Extérieur moderne du gîte l'écrin du vignoble" },
]

interface AboutSectionProps {
  data?: HomePageAbout | null
  fullGalleryImages?: HomePageGalleryImage[]
}

export default function AboutSection({ data, fullGalleryImages }: AboutSectionProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  const about = { ...defaultAbout, ...data }
  const highlights = about.highlights || defaultAbout.highlights || []

  // Utiliser les images Sanity ou les images par défaut
  const hasSanityImages = data?.galleryImages && data.galleryImages.length > 0

  return (
    <section id="gite" className="py-24 lg:py-32 bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            {about.badge && (
              <span className="text-gold font-medium tracking-[0.2em] uppercase text-sm">
                {about.badge}
              </span>
            )}
            {about.title && (
              <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl text-slate leading-tight">
                {about.title}
              </h2>
            )}
            {about.description1 && (
              <p className="mt-6 text-taupe text-lg leading-relaxed">
                {about.description1}
              </p>
            )}
            {about.description2 && (
              <p className="mt-4 text-taupe text-lg leading-relaxed">
                {about.description2}
              </p>
            )}

            {/* Highlights Grid */}
            <div className="mt-10 grid grid-cols-2 gap-6">
              {highlights.map((item, index) => {
                const IconComponent = iconMap[item.icon] || MapPin
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate">{item.label}</h3>
                      <p className="text-sm text-taupe">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Image Grid */}
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                {/* Image 1 */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  {hasSanityImages && data.galleryImages![0] ? (
                    <Image
                      src={urlFor(data.galleryImages![0]).width(600).height(800).url()}
                      alt={data.galleryImages![0].alt || "Image du gîte"}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <Image
                      src={defaultGalleryImages[0].src}
                      alt={defaultGalleryImages[0].alt}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  )}
                </div>
                {/* Image 2 */}
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  {hasSanityImages && data.galleryImages![1] ? (
                    <Image
                      src={urlFor(data.galleryImages![1]).width(600).height(600).url()}
                      alt={data.galleryImages![1].alt || "Image du gîte"}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <Image
                      src={defaultGalleryImages[1].src}
                      alt={defaultGalleryImages[1].alt}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  )}
                </div>
              </div>
              <div className="space-y-4 pt-8">
                {/* Image 3 */}
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  {hasSanityImages && data.galleryImages![2] ? (
                    <Image
                      src={urlFor(data.galleryImages![2]).width(600).height(600).url()}
                      alt={data.galleryImages![2].alt || "Image du gîte"}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <Image
                      src={defaultGalleryImages[2].src}
                      alt={defaultGalleryImages[2].alt}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  )}
                </div>
                {/* Image 4 */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  {hasSanityImages && data.galleryImages![3] ? (
                    <Image
                      src={urlFor(data.galleryImages![3]).width(600).height(800).url()}
                      alt={data.galleryImages![3].alt || "Image du gîte"}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <Image
                      src={defaultGalleryImages[3].src}
                      alt={defaultGalleryImages[3].alt}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Gallery Button */}
            <button
              onClick={() => setIsGalleryOpen(true)}
              className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors"
            >
              <Images className="w-5 h-5" />
              <span>{about.galleryButtonText}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      <GalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} images={fullGalleryImages} />
    </section>
  )
}
