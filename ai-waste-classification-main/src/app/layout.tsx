import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ระบบตรวจจับประเภทขยะสำหรับรีไซเคิลด้วย AI',
  description: 'ระบบประมวลผลด้วย Deep Learning เพื่อการคัดแยกขยะที่ถูกต้องและยั่งยืน',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body className={`${inter.className} bg-gray-50 min-h-screen flex flex-col`}>
        <Navbar />
        {/* ใช้ flex-1 เพื่อให้ Footer ถูกดันลงไปด้านล่างเสมอแม้เนื้อหาจะมีน้อย */}
        <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}