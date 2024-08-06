import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./header";
import { ThemeModeScript } from "flowbite-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Urban Grid",
  description: "AI Powered Traffic Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body>
        <div className="main-area">
          <Header />
          {children}
        </div>
        <ToastContainer />
      </body>
    </html>
  );
}
