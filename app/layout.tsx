import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manuela Rodriguez | Web Development Portfolio",
  description:"Welcome to my portfolio! You can check my progress and projects.",
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
