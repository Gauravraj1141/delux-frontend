import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import AppShell from "@/components/AppShell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const teko = localFont({
  src: "../public/fonts/Teko-Bold.ttf",
  variable: "--font-hindi",
  display: "swap",
});

const SITE_URL = "https://deluxesalonsongs.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Deluxe Salon Songs — 90s Hindi Songs Radio | डीलक्स सैलून सॉन्ग्स",
    template: "%s | Deluxe Salon Songs Radio",
  },
  description:
    "Deluxe Salon Songs (Delux Salon / Deluxe Saloon / Delux Saloon) — a live 90s Bollywood radio station. Plays the songs heard in Indian barbershops, truck cabins and highway dhabas. Listen free online 24/7. Also known as DeluxeSaloon, DeluxeSalon, DeluxSalon, डीलक्स सैलून सॉन्ग्स.",
  keywords: [
    // Brand — exact + misspellings + no-space variants
    "Deluxe Salon Songs",
    "Deluxe Saloon Songs",
    "Deluxe Saloon",
    "Deluxe Salon",
    "Delux Salon",
    "Delux Saloon",
    "Delux Salon Songs",
    "Delux Saloon Songs",
    "deluxesalonsongs",
    "deluxesaloonsongs",
    "deluxesaloon",
    "deluxesalon",
    "deluxsalon",
    "deluxsaloon",
    "delux salon",
    "delux saloon",
    "deluxe salon song",
    "deluxe saloon song",
    "delux salon songs",
    "delux saloon songs",
    "Deluxe Salon Songs radio",
    "Deluxe Saloon Songs radio",
    "Deluxe Salon Songs music",
    "Deluxe Salon Songs playlist",
    "Deluxe Salon Songs live",
    "Deluxe Salon Songs blog",
    // Hindi brand variants
    "डीलक्स सैलून",
    "डीलक्स सैलून गाने",
    "डीलक्स सैलून सॉन्ग्स",
    "डीलक्स सलून",
    "डीलक्स सलून सॉन्ग्स",
    "डिलक्स सैलून",
    "डिलक्स सलून",
    // Search trend keywords
    "deluxe salon website",
    "deluxe salon playlist",
    "deluxe salon playlist website",
    "deluxe salon music",
    "deluxe salon music website",
    "deluxe salon song website",
    "deluxe salon app",
    "salon deluxe song",
    "salon playlist",
    "salon playlist website",
    "salon music",
    "salon song website",
    "salon wala",
    "saloon",
    "saloon song",
    "saloon songs",
    "saloon wala",
    // Truck & highway culture
    "truck wala",
    "truck wala playlist",
    "truck wala music",
    "truck vala",
    "truck driver",
    "truck driver playlist",
    "truckwala",
    "horn ok please",
    "bus driver",
    "bus driver playlist",
    "bus driver playlist website",
    "bus wala",
    // Persona keywords
    "raju mistri",
    "raju mistri playlist",
    // Genre keywords
    "Hindi songs",
    "90s Hindi songs",
    "Bollywood radio",
    "Hindi film songs",
    "Indian music radio",
    "free Hindi music",
    "online Hindi radio",
    "Bollywood classics",
    "Hindi lo-fi",
    "desi music",
    "saloon radio",
    "salon radio",
    "90s Bollywood",
    "retro Hindi songs",
    "Indian barbershop music",
    "highway dhaba songs",
    "truck cabin music",
    "90s Bollywood radio online",
    "listen 90s Hindi songs free",
    "old Hindi songs radio",
    "Kumar Sanu radio",
    "Udit Narayan songs online",
    "best 90s Bollywood playlist",
    "Bollywood ghazals online",
    "Indian salon music",
  ],
  authors: [{ name: "Deluxe Salon Songs" }],
  creator: "Deluxe Salon Songs",
  publisher: "Deluxe Salon Songs",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Deluxe Salon Songs",
    title: "Deluxe Salon Songs — 90s Hindi Songs, Playing Live | डीलक्स सैलून सॉन्ग्स",
    description:
      "Deluxe Salon Songs — a live 90s Bollywood radio. The songs that actually play in Indian barbershops, truck cabins and highway dhabas. Listen free on Deluxe Salon Songs.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Deluxe Salon Songs (Delux Salon / Deluxe Saloon / Delux Saloon) — 90s Hindi Songs Radio | डीलक्स सैलून सॉन्ग्स",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deluxe Salon Songs — 90s Hindi Songs, Playing Live",
    description:
      "Deluxe Salon Songs — a live 90s Bollywood radio. Listen to Hindi film songs free, playing round the clock. डीलक्स सैलून सॉन्ग्स",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-IN": SITE_URL,
      "hi-IN": SITE_URL,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Deluxe Salon Songs",
      alternateName: ["Deluxe Saloon", "Deluxe Salon", "Delux Salon", "Delux Saloon", "Delux Salon Songs", "Delux Saloon Songs", "Deluxe Saloon Songs", "डीलक्स सैलून", "डीलक्स सैलून सॉन्ग्स", "डीलक्स सलून", "डिलक्स सैलून", "deluxesalonsongs", "deluxesaloonsongs", "deluxesaloon", "deluxesalon", "deluxsalon", "deluxsaloon"],
      description:
        "Deluxe Salon Songs — a live 90s Bollywood radio station playing the songs that actually play in Indian barbershops, truck cabins and highway dhabas.",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/songs?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Deluxe Salon Songs",
      alternateName: ["Deluxe Saloon", "Deluxe Salon", "Delux Salon", "Delux Saloon", "Delux Salon Songs", "Delux Saloon Songs", "Deluxe Saloon Songs", "deluxesalonsongs", "deluxesaloonsongs", "deluxesaloon", "deluxesalon", "deluxsalon", "deluxsaloon"],
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
      },
    },
    {
      "@type": "RadioStation",
      "@id": `${SITE_URL}/#station`,
      name: "Deluxe Salon Songs",
      alternateName: ["Deluxe Saloon", "Deluxe Salon", "Delux Salon", "Delux Saloon", "Deluxe Saloon Songs", "डीलक्स सैलून", "डीलक्स सैलून सॉन्ग्स", "डीलक्स सलून", "डिलक्स सैलून"],
      url: SITE_URL,
      description:
        "Deluxe Salon Songs — free online Hindi radio playing 90s Bollywood film songs round the clock. Listen live.",
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      genre: ["Bollywood", "Hindi film music", "1990s", "Retro", "Indian", "Deluxe Salon Songs", "Deluxe Saloon"],
    },
    {
      "@type": "Blog",
      "@id": `${SITE_URL}/blog/#blog`,
      url: `${SITE_URL}/blog`,
      name: "Deluxe Salon Songs Blog",
      description: "Stories about 90s Bollywood music, Indian salon culture, highway playlists, and the sounds that define Deluxe Salon Songs.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Deluxe Salon Songs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Deluxe Salon Songs (also known as Delux Salon, Deluxe Saloon, Delux Saloon, डीलक्स सैलून) is a free online radio station that plays 90s Bollywood music — the kind of songs you hear in Indian barbershops, truck cabins, and highway dhabas. It plays 24/7 at deluxesalonsongs.com.",
          },
        },
        {
          "@type": "Question",
          name: "How do I listen to Deluxe Salon Songs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Just visit deluxesalonsongs.com and hit play. It's completely free, no sign-up needed. You can switch between different playlists like 90s Salon Vibe, Monsoon Special, Golden Ghazals, Feel Good, and more.",
          },
        },
        {
          "@type": "Question",
          name: "Is Deluxe Salon Songs free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Deluxe Salon Songs is 100% free. All music plays through YouTube's embedded player — nothing is hosted on the site. No ads, no subscriptions, just music.",
          },
        },
        {
          "@type": "Question",
          name: "What kind of music does Deluxe Salon Songs play?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Deluxe Salon Songs plays 90s Bollywood film music, ghazals, romantic ballads, and retro Hindi songs. Think Kumar Sanu, Udit Narayan, Alka Yagnik, Lata Mangeshkar — the songs that play in every Indian salon, truck cabin, and dhaba.",
          },
        },
        {
          "@type": "Question",
          name: "Is Deluxe Salon Songs the same as Delux Salon or Deluxe Saloon?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! Deluxe Salon Songs is often searched as Delux Salon, Deluxe Saloon, Delux Saloon, Salon Wala, DeluxeSalon, DeluxeSaloon, and डीलक्स सैलून. They all refer to the same website: deluxesalonsongs.com.",
          },
        },
        {
          "@type": "Question",
          name: "What are the best playlists on Deluxe Salon Songs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Popular playlists include 90s Salon Vibe (classic barbershop hits), Monsoon Special (rain songs), Golden Ghazals (timeless poetry), Feel Good (uplifting tracks), Safarnama (road trip music), and Broken But Beautiful (sad songs). Visit the playlists page to browse all.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${teko.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="google-site-verification" content="z06AbGArLI23gl4rBnhCoWH_U1jVV7_mwDFgmQliAa0" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QHMDVXX6W3" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-QHMDVXX6W3');`,
          }}
        />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
