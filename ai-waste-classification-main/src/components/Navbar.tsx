"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "เข้าสู่ระบบ", href: "/login" },
    { name: "หน้าหลัก", href: "/" },
    { name: "ตรวจจับขยะ", href: "/detect" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            {/* Logo หรือชื่อโปรเจค */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">♻️</span>
              </div>
              <span className="font-bold text-xl text-gray-800 hidden md:block">
                AI Waste Detection
              </span>
            </Link>

            {/* Menu Items */}
            <div className="flex gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-green-50 text-green-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center">
            <span className="text-xs text-gray-400 font-mono">Demo v1.1</span>
          </div>
        </div>
      </div>
    </nav>
  );
}