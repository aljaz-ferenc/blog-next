import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthContextProvider from "@/context/authContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WebBlog",
  description:
    "A blog about learning web development with HTML, CSS, JavaScript, React, NextJS, Tailwind, MongoDB, Node and other technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContextProvider>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </AuthContextProvider>
  );
}
