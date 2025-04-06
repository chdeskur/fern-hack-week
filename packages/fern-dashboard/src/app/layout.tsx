import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

import { Toaster } from "@/components/ui/sonner";
import { PostHogProvider } from "@/providers/PosthogProvider";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";

import { gtPlanar } from "./fonts";
import "./globals.css";
import { getCurrentSession } from "./services/auth0/getCurrentSession";

export const metadata: Metadata = {
  title: "Fern Dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.JSX.Element;
}>) {
  const session = await getCurrentSession();

  return (
    <html lang="en" suppressHydrationWarning className={gtPlanar.className}>
      <body className="flex h-[calc(100dvh)] antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <PostHogProvider session={session}>{children}</PostHogProvider>
          </ReactQueryProvider>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
