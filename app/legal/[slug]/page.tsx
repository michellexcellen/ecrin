
import { getLegalPage } from "@/lib/sanity"
import { PortableText } from "@portabletext/react"
import { notFound } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Image from "next/image"
import type { Metadata } from "next"

// Force regeneration on demand
export const revalidate = 60

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const page = await getLegalPage(slug)

    if (!page) {
        return {
            title: "Page introuvable",
        }
    }

    return {
        title: page.seo?.metaTitle || page.title,
        description: page.seo?.metaDescription || `Page légale : ${page.title}`,
    }
}

export default async function LegalPage({ params }: Props) {
    const { slug } = await params
    const page = await getLegalPage(slug)

    if (!page) {
        notFound()
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-white">
                {/* Simple Hero Section for Legal Pages */}
                <section className="relative bg-anthracite py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-gold font-serif text-lg tracking-[0.3em] uppercase mb-4 block">Information</span>
                        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white max-w-4xl mx-auto">{page.title}</h1>
                    </div>
                </section>

                {/* Content */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl">
                        <div className="prose prose-lg prose-slate max-w-none prose-headings:font-serif prose-headings:text-slate prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-li:marker:text-gold">
                            <PortableText value={page.content} />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
