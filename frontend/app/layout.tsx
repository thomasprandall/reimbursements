import type { Metadata } from "next";
import "./globals.css";

import SidebarNav from "./_components/SidebarNav";
import Link from "next/link";
import { ReactNode } from "react";
import { BsWindowDock, BsPeopleFill } from "react-icons/bs";

export const metadata: Metadata = {
  title: "Friendly Coding Challenge"
};

const navLinks = [
    {
        name: "Requests",
        url: "/requests",
        icon: <BsWindowDock  />
    },
    {
        name: "Management",
        url: "/management",
        icon: <BsPeopleFill  />

    }
];

type NavLink = {
    name: "Requests",
    url: "/requests",
    icon: ReactNode
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-12 py-2 px-4 shadow-md shadow-slate-200 mb-3 flex flex-row justify-between">
          <Link href="/">Screener Logo</Link>
          <div className="flex flex-row gap-4">
            {
              navLinks.map((link) => <Link key={link.name.toLowerCase()} href={link.url} className="flex flex-row gap-2 items-center">{link.icon} {link.name}</Link>)
            }
          </div>
        </div>
        <div className="min-h-screen flex flex-row">
          <div className="hidden md:flex md:basis-1/4 bg-blue-50 p-8" id="sidebar">
            <SidebarNav links={navLinks}  />
          </div>
          <div id="main" className="p-8 w-full">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
