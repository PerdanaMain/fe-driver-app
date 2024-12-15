import type { Metadata } from "next";
import { ClientProvider } from "../components/client-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Driver App",
  description: "Authentication with NextAuth.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className='min-h-screen bg-gray-100 p-8'>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}