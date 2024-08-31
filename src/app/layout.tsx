import type { Metadata } from "next";
import { Inter, Poiret_One, Limelight, Quicksand } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

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
      <body className={`${poiretOne.className} h-screen w-screen`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
           <main className = 'pt-0'>{children}</main>
          </ThemeProvider>
      </body>
    </html>
  );
}

 