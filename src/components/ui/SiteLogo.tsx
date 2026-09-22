"use client";

import { useEffect, useState } from "react";
import { getSiteSettings } from "@/app/(admin)/settings/actions";
import Link from "next/link";

interface SiteLogoProps {
  type?: "admin" | "client" | "public";
  className?: string;
  textClassName?: string;
}

export default function SiteLogo({ type = "public", className = "", textClassName = "" }: SiteLogoProps) {
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [siteName, setSiteName] = useState<string>("OOWD");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLogo() {
      // Use sessionStorage cache to prevent multiple fetches across components
      const cached = sessionStorage.getItem("siteSettings");
      if (cached) {
        const settings = JSON.parse(cached);
        if (settings.logoUrl) setLogoUrl(settings.logoUrl);
        if (settings.siteName) setSiteName(settings.siteName);
        setIsLoading(false);
        return;
      }

      const res = await getSiteSettings();
      if (res.success && res.settings) {
        if (res.settings.logoUrl) setLogoUrl(res.settings.logoUrl);
        if (res.settings.siteName) setSiteName(res.settings.siteName);
        sessionStorage.setItem("siteSettings", JSON.stringify(res.settings));
      }
      setIsLoading(false);
    }
    fetchLogo();
  }, []);

  const defaultText = type === "admin" ? "Admin" : type === "client" ? "Client" : "";
  const displayText = siteName + (defaultText ? ` ${defaultText}` : "");

  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      {logoUrl && !isLoading ? (
        <img src={logoUrl} alt={siteName} className="h-8 w-auto object-contain" />
      ) : (
        <span className={`font-serif font-semibold text-primary ${textClassName}`}>
          {isLoading ? "..." : displayText}
        </span>
      )}
    </Link>
  );
}
