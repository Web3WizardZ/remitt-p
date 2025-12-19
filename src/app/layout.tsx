import "./globals.css";
import type { Metadata } from "next";
import BrandBackground from "@/components/BrandBackground";
import Providers from "./providers";


export const metadata: Metadata = {
  title: "RemittEase",
  description: "Send money globally with ease",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <BrandBackground />
          {children}
        </Providers>
      </body>
    </html>
  );
}
