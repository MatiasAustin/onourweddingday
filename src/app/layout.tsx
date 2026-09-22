import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

import { createClient } from "@/utils/supabase/server";

export async function generateMetadata(): Promise<Metadata> {
  let title = "OnOurWeddingDay | Premium Digital Invitations";
  let description = "Create beautiful, modern, and elegant digital wedding invitations.";
  let icons = undefined;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.storage.from('media').download('settings.json');
    if (!error && data) {
      const text = await data.text();
      const settings = JSON.parse(text);
      if (settings.siteName) title = settings.siteName;
      if (settings.siteDescription) description = settings.siteDescription;
      if (settings.faviconUrl) {
        icons = { icon: settings.faviconUrl, shortcut: settings.faviconUrl, apple: settings.faviconUrl };
      }
    }
  } catch (err) {
    // silently fail
  }

  return { title, description, icons };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
        lang="en"
        className={`${inter.variable} ${playfair.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col font-sans text-foreground bg-background">
          {children}
        </body>
      </html>
  );
}
