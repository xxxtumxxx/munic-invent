import type { Metadata } from "next";
import { Sarabun, Kanit } from "next/font/google";
import "./globals.css";

const sarabun = Sarabun({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-sarabun",
  display: "swap",
});

const kanit = Kanit({
  weight: ["400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-kanit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ระบบบริหารจัดการพัสดุและครุภัณฑ์ | เทศบาล",
  description: "ระบบบริหารจัดการพัสดุ ครุภัณฑ์ และการเบิกจ่ายออนไลน์สำหรับองค์กรปกครองส่วนท้องถิ่น (Municipal Inventory Management System)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${sarabun.variable} ${kanit.variable} dark`}>
      <body className="min-h-screen bg-[#07090e] text-slate-100 font-sans antialiased selection:bg-blue-500/30 selection:text-blue-200">
        {/* Ambient Glowing Background Orbs for Frosted Glass Effect */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/15 blur-[128px] animate-pulse" />
          <div className="absolute top-[20%] right-[-5%] w-[450px] h-[450px] rounded-full bg-purple-600/15 blur-[140px]" />
          <div className="absolute bottom-[-10%] left-[25%] w-[600px] h-[600px] rounded-full bg-teal-600/10 blur-[150px]" />
        </div>

        <div className="relative min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
