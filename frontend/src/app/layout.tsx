import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link"; // Import Link for navigation
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu"; // Ensure the correct path
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Navigation Menu */}
        <div className="flex w-full justify-end px-4">
          <NavigationMenu className="w-1000 ">
            <NavigationMenuList>
              <NavigationMenuItem className="flex space-x-4">
                <NavigationMenuLink asChild className="hover:text-slate-400">
                  <Link href="/">Home</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="hover:text-slate-400">
                  <Link href="/schedules">Schedules</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
       

        {/* Main content */}
        {children}
      </body>
    </html>
  );
}
