import type { Metadata } from "next";
import { Inter, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-hindi",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://deluxsalongsongs.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Deluxe Saloon | Deluxe Salon — 90s Hindi Songs Radio | डीलक्स सैलून",
    template: "%s | Deluxe Saloon — Deluxe Salon Radio",
  },
  description:
    "Deluxe Saloon (Deluxe Salon) — a live 90s Bollywood radio station. The Deluxe Saloon plays the songs that actually play in Indian barbershops, truck cabins and highway dhabas. Listen to Deluxe Salon songs free online, playing round the clock. Also known as DeluxeSaloon, DeluxeSalon, डीलक्स सैलून.",
  keywords: [
    "Deluxe Saloon",
    "Deluxe Salon",
    "deluxesaloon",
    "deluxesalon",
    "Deluxe Saloon songs",
    "Deluxe Salon songs",
    "Deluxe Saloon radio",
    "Deluxe Salon radio",
    "Deluxe Saloon music",
    "Deluxe Salon music",
    "Deluxe Saloon playlist",
    "Deluxe Salon playlist",
    "Deluxe Saloon live",
    "डीलक्स सैलून",
    "डीलक्स सैलून गाने",
    "डीलक्स सलून",
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
    "90s Bollywood",
    "retro Hindi songs",
    "Indian barbershop music",
    "highway dhaba songs",
    "truck cabin music",
    "deluxe saloon website",
    "deluxe salon website",
  ],
  authors: [{ name: "Deluxe Saloon" }],
  creator: "Deluxe Saloon",
  publisher: "Deluxe Salon",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Deluxe Saloon — Deluxe Salon",
    title: "Deluxe Saloon | Deluxe Salon — 90s Hindi Songs, Playing Live | डीलक्स सैलून",
    description:
      "Deluxe Saloon (Deluxe Salon) — a live 90s Bollywood radio. The songs that actually play in Indian barbershops, truck cabins and highway dhabas. Listen free on Deluxe Saloon.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Deluxe Saloon — Deluxe Salon — 90s Hindi Songs Radio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deluxe Saloon | Deluxe Salon — 90s Hindi Songs, Playing Live",
    description:
      "Deluxe Saloon (Deluxe Salon) — a live 90s Bollywood radio. Listen to Hindi film songs free, playing round the clock. डीलक्स सैलून",
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
      name: "Deluxe Saloon",
      alternateName: ["Deluxe Salon", "डीलक्स सैलून", "डीलक्स सलून", "deluxesaloon", "deluxesalon", "Deluxe Saloon Radio", "Deluxe Salon Radio", "Deluxe Saloon Songs"],
      description:
        "Deluxe Saloon (Deluxe Salon) — a live 90s Bollywood radio station. Deluxe Saloon plays the songs that actually play in Indian barbershops, truck cabins and highway dhabas.",
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
      name: "Deluxe Saloon",
      alternateName: ["Deluxe Salon", "deluxesaloon", "deluxesalon"],
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
      name: "Deluxe Saloon",
      alternateName: ["Deluxe Salon", "डीलक्स सैलून", "डीलक्स सलून", "Deluxe Saloon Radio", "Deluxe Salon Songs"],
      url: SITE_URL,
      description:
        "Deluxe Saloon (Deluxe Salon) — free online Hindi radio playing 90s Bollywood film songs round the clock. Listen to Deluxe Saloon songs live.",
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      genre: ["Bollywood", "Hindi film music", "1990s", "Retro", "Indian", "Deluxe Saloon", "Deluxe Salon"],
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${notoDevanagari.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://www.youtube-nocookie.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
