import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";
import { auth } from "~/server/auth";
import { SessionProvider } from "next-auth/react";
import Navigation from "./_components/Navigation";
import ThemeRegistry from "./_components/ThemeRegistry";
import { SelectionProvider } from "~/contexts/SelectionContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "HelixAI",
  description: "AI-powered drug research platform",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <SessionProvider session={session}>
          <TRPCReactProvider>
            <ThemeRegistry>
              <SelectionProvider>
                <Navigation />
                <main>
                  {children}
                </main>
              </SelectionProvider>
            </ThemeRegistry>
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
