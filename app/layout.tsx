import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
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

const SITE_URL = "https://deluxsalongsongs.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Deluxe Salon Songs — 90s Hindi Songs Radio | डीलक्स सैलून सॉन्ग्स",
    template: "%s | Deluxe Salon Songs Radio",
  },
  description:
    "Deluxe Salon Songs — a live 90s Bollywood radio station. Deluxe Salon Songs plays the songs that actually play in Indian barbershops, truck cabins and highway dhabas. Listen free online, playing round the clock. Also known as Deluxe Saloon, DeluxeSaloon, DeluxeSalon, डीलक्स सैलून.",
  keywords: [
    "Deluxe Salon Songs",
    "Deluxe Saloon",
    "Deluxe Salon",
    "deluxesalonsongs",
    "deluxesaloon",
    "deluxesalon",
    "Deluxe Salon Songs radio",
    "Deluxe Saloon songs",
    "Deluxe Salon songs",
    "Deluxe Salon Songs music",
    "Deluxe Salon Songs playlist",
    "Deluxe Salon Songs live",
    "डीलक्स सैलून",
    "डीलक्स सैलून गाने",
    "डीलक्स सैलून सॉन्ग्स",
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
    "deluxe salon songs website",
    "deluxesalonsongs",
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
        alt: "Deluxe Salon Songs — 90s Hindi Songs Radio",
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
      alternateName: ["Deluxe Saloon", "Deluxe Salon", "डीलक्स सैलून", "डीलक्स सैलून सॉन्ग्स", "डीलक्स सलून", "deluxesalonsongs", "deluxesaloon", "deluxesalon"],
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
      alternateName: ["Deluxe Saloon", "Deluxe Salon", "deluxesalonsongs", "deluxesaloon", "deluxesalon"],
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
      alternateName: ["Deluxe Saloon", "Deluxe Salon", "डीलक्स सैलून", "डीलक्स सैलून सॉन्ग्स", "डीलक्स सलून"],
      url: SITE_URL,
      description:
        "Deluxe Salon Songs — free online Hindi radio playing 90s Bollywood film songs round the clock. Listen live.",
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      genre: ["Bollywood", "Hindi film music", "1990s", "Retro", "Indian", "Deluxe Salon Songs", "Deluxe Saloon"],
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
        {children}
      </body>
    </html>
  );
}
