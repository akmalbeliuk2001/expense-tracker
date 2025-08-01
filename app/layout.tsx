import "./globals.css";
import type { Metadata } from "next";
import { Afacad_Flux } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";

const afacadFlux = Afacad_Flux({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${afacadFlux.className}`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
