
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface FooterLinkProps {
    href: string
    children: React.ReactNode
    variant?: 'quick' | 'legal'
}

export default function FooterLink({ href, children, variant = 'quick' }: FooterLinkProps) {
    const pathname = usePathname()
    const isActive = href === "/" ? (pathname === "/" || pathname === "") : pathname === href

    if (variant === 'legal') {
        return (
            <Link
                href={href}
                className={`transition-colors duration-200 ${isActive
                    ? "text-gold font-medium"
                    : "text-white/50 hover:text-gold"
                    }`}
            >
                {children}
            </Link>
        )
    }

    // Quick links
    return (
        <Link
            href={href}
            className={`transition-colors duration-200 ${isActive
                ? "text-gold font-medium"
                : "text-white/70 hover:text-gold"
                }`}
        >
            {children}
        </Link>
    )
}
