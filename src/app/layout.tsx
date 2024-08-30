import type { Metadata } from "next";
import { Inter, Poiret_One, Limelight } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const poiretOne = Poiret_One({ subsets: ["latin"], weight: ['400'] });
const limelight = Limelight({subsets: ["latin"], weight: ["400"]})

export const metadata: Metadata = {
  title: "REWIND",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="REWIND" lang="en">
      <body className={`${poiretOne.className} h-screen w-screen`}>
        {children}
        </body>
    </html>
  );
}
