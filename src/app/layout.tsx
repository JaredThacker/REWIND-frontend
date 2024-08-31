import type { Metadata } from "next";
import { Inter, Poiret_One, Limelight, Quicksand } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const poiretOne = Poiret_One({ subsets: ["latin"], weight: ["400"] });
const limelight = Limelight({ subsets: ["latin"], weight: ["400"] });
const quickSand = Quicksand({ subsets: ["latin"], weight: "700" });

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
      <body className={`${quickSand.className} h-screen w-screen`}>
        {children}
      </body>
    </html>
  );
}
