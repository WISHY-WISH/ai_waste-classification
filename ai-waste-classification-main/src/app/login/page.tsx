"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // จำลองการเข้าสู่ระบบ (UC100)
    router.push('/dashboard');
  };

  return (
<div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4 font-sans" style={{ fontFamily: "Inter, Noto Sans Thai, sans-serif" }}>
      <div className="bg-white rounded-3xl p-10 w-full max-w-md shadow-2xl text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-emerald-50 p-4 rounded-2xl text-3xl">♻️</div>
        </div>
        
        <h1 className="text-2xl font-black text-gray-800 tracking-tight">ระบบตรวจจับขยะด้วย AI</h1>
        <p className="text-gray-400 text-[10px] mt-1 mb-8 uppercase tracking-widest font-bold">AI-Based Waste Classification System</p>
        
        <form onSubmit={handleLogin} className="space-y-5 text-left">
          <div>
            <label className="text-xs font-black text-gray-500 ml-1">อีเมล</label>
            <input type="email" defaultValue="user@psu.ac.th" className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div>
            <label className="text-xs font-black text-gray-500 ml-1">รหัสผ่าน</label>
<input type="password" placeholder="•••••" className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700" />
<p className="text-[10px] text-red-500 mt-2 ml-1 font-bold">⚠️ รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร</p>
          </div>
<button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 rounded-xl mt-6 shadow-lg shadow-emerald-100 transition-all text-lg">
            เข้าสู่ระบบ
          </button>
        </form>
        
        <p className="mt-8 text-xs text-gray-400 font-bold">ยังไม่มีบัญชี? <span className="text-emerald-600 cursor-pointer">สมัครสมาชิก</span></p>
      </div>
    </div>
  );
}