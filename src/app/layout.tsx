import type { Metadata } from "next";
import { Geist, Sedgwick_Ave_Display } from "next/font/google";

import { Providers } from "./providers";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const sedgwickAveDisplaySans = Sedgwick_Ave_Display({
  weight: "400",
  variable: "--font-sedgwick-ave-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Resolver",
  description: "Queue you task to resolve",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${sedgwickAveDisplaySans.variable}`}
      >
        <Providers baseApiUrl={process.env.BASE_REST_API_URL as string}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
