import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Manuela Rodriguez | Web Development Portfolio",
    template: "%s | Manuela Rodriguez",
  },

  description:
    "Welcome to my portfolio! Explore my web development projects, technical skills, and learning journey.",

  metadataBase: new URL("https://your-portfolio-url.vercel.app"),

  openGraph: {
    title: "Manuela Rodriguez | Web Development Portfolio",
    description:
      "Explore my web development projects, technical skills, and learning journey.",
    siteName: "Manuela Rodriguez Portfolio",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Manuela Rodriguez Web Development Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />

        <div className="flex-grow">
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}
