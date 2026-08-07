import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "David Aerni — Konstruktion & Visualisierung",
  description: "Freelance Konstruktion, 3D-Modellierung und Visualisierung.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
