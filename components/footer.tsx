
import Link from "next/link"
import { MapPin, Phone, Mail } from "lucide-react"
import { getFooterSettings } from "@/lib/sanity"
import FooterLink from "./footer-link"

export default async function Footer() {
  const footer = await getFooterSettings()

  return (
    <footer id="contact" className="bg-anthracite text-white">
      {/* Contact Section */}
      <div className="py-20 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <h2 className="font-serif text-3xl text-white">
                {footer?.brandTitle || "l'écrin du vignoble"}
              </h2>
              <p className="mt-6 text-white/70 max-w-md leading-relaxed whitespace-pre-line">
                {footer?.brandDescription || "Gîte luxueux avec jacuzzi au cœur du vignoble alsacien.\nÀ 10 minutes d'Eguisheim, l'un des plus beaux villages de France."}
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-serif text-xl mb-6">
                {footer?.contactTitle || "Contact"}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-white/70 whitespace-pre-line">
                    {footer?.address || "l'écrin du vignoble\n68920 Wettolsheim\nAlsace, France"}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                  <a href={`tel:${footer?.phone || "+33681842554"}`} className="text-white/70 hover:text-gold transition-colors">
                    {footer?.phone || "+33 6 81 84 25 54"}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                  <a
                    href={`mailto:${footer?.email || "lexcellent.michel@orange.fr"}`}
                    className="text-white/70 hover:text-gold transition-colors"
                  >
                    {footer?.email || "lexcellent.michel@orange.fr"}
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-serif text-xl mb-6">
                {footer?.linksTitle || "Liens rapides"}
              </h3>
              <ul className="space-y-3">
                {[
                  { href: "/", label: "Accueil" },
                  { href: "/gite", label: "Le Gîte" },
                  { href: "/tourisme", label: "La Région" },
                  { href: "/contact", label: "Contact & Réservation" },
                ].map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href}>
                      {link.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} {footer?.copyright || "l'écrin du vignoble. Tous droits réservés."}
            </p>
            <div className="flex gap-6 text-sm">
              <FooterLink href="/legal/mentions-legales" variant="legal">
                Mentions Légales
              </FooterLink>
              <FooterLink href="/legal/cgv" variant="legal">
                CGV
              </FooterLink>
              <FooterLink href="/legal/confidentialite" variant="legal">
                Confidentialité
              </FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
