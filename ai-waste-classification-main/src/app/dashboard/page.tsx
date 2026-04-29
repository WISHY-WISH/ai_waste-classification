"use client";
import { useEffect, useState } from "react";
// รัน: npm install recharts เพื่อใช้งานกราฟ
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface WasteRecord {
  id: number;
  wasteType: string;
  category: string;
  confidence: number;
  binColor: string;
  createdAt: string;
}

// รายการอ้างอิงประเภทขยะตามดีไซน์ UI-04 
const mockWasteTypes = [
  { icon: '🍾', type: 'ขยะแก้ว', category: 'ขยะรีไซเคิล', bin: '🟡 ถังสีเหลือง', color: 'text-yellow-600' },
  { icon: '🥫', type: 'ขยะโลหะ', category: 'ขยะรีไซเคิล', bin: '🟡 ถังสีเหลือง', color: 'text-yellow-600' },
  { icon: '🧊', type: 'เศษโฟม', category: 'ขยะทั่วไป', bin: '🔵 ถังสีน้ำเงิน', color: 'text-blue-600' },
  { icon: '🛍️', type: 'ขยะพลาสติก', category: 'ขยะรีไซเคิล', bin: '🟡 ถังสีเหลือง', color: 'text-yellow-600' },
  { icon: '🔋', type: 'แบตเตอรี่', category: 'ขยะอันตราย', bin: '🔴 ถังสีแดง', color: 'text-red-600' },
  { icon: '💡', type: 'หลอดไฟ', category: 'ขยะอันตราย', bin: '🔴 ถังสีแดง', color: 'text-red-600' },
  { icon: '🍎', type: 'ขยะอินทรีย์', category: 'ขยะอินทรีย์', bin: '🟢 ถังสีเขียว', color: 'text-green-600' },
  { icon: '💻', type: 'ขยะอิเล็กทรอนิกส์', category: 'ขยะอันตราย', bin: '🔴 ถังสีแดง', color: 'text-red-600' },
  { icon: '📰', type: 'กระดาษ', category: 'ขยะรีไซเคิล', bin: '🟡 ถังสีเหลือง', color: 'text-yellow-600' },
  { icon: '👕', type: 'เสื้อผ้า', category: 'ขยะทั่วไป', bin: '🔵 ถังสีน้ำเงิน', color: 'text-blue-600' },
];

// กำหนดสีตามมาตรฐานสีถังขยะใน SRS (WCF-REQ-03) 
// ❌ เดิม (สีสลับกัน)
const COLORS = {
  'ขยะอินทรีย์': '#22C55E',
  'ขยะรีไซเคิล': '#3B82F6',  // น้ำเงิน ← ผิด
  'ขยะอันตราย': '#EF4444',
  'ขยะทั่วไป': '#FACC15',    // เหลือง ← ผิด
};

// ✅ แก้เป็น
const CATEGORY_COLORS = {
  'ขยะอินทรีย์': '#22C55E',  // เขียว
  'ขยะรีไซเคิล': '#EAB308',  // เหลือง ← แก้
  'ขยะอันตราย': '#EF4444',   // แดง
  'ขยะทั่วไป': '#3B82F6',    // น้ำเงิน ← แก้
};

const getWasteTypeColor = (wasteType: string) => {
  switch (wasteType) {
    case 'ขยะแก้ว': return '#6D28D9'; // Purple
    case 'ขยะโลหะ': return '#C2410C'; // Orange
    case 'โฟม': return '#FDE047'; // Yellow
    case 'ขยะพลาสติก': return '#2563EB'; // Blue
    case 'แบตเตอรี่': return '#DC2626'; // Red
    case 'หลอดไฟ': return '#EA580C'; // Orange
    case 'ขยะอินทรีย์': return '#16A34A'; // Green
    case 'ขยะอิเล็กทรอนิกส์': return '#0F172A'; // Dark Blue
    case 'กระดาษ': return '#4F46E5'; // Indigo
    case 'เสื้อผ้า': return '#DB2777'; // Pink
    default: return '#6B7280'; // Gray
  }
};

export default function DashboardPage() {
  const [records, setRecords] = useState<WasteRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูลจริงจาก API (UC500) [cite: 116]
  useEffect(() => {
    fetch("/api/waste")
      .then((res) => res.json())
      .then((data) => {
        setRecords(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 1. ตรวจสอบข้อมูลสถิติที่ได้จากฐานข้อมูล (UC400) [cite: 101, 114]
  const categoryStats = records.reduce((acc: { [key: string]: number }, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {});

  const wasteTypeStats = records.reduce((acc: { [key: string]: number }, curr) => {
    acc[curr.wasteType] = (acc[curr.wasteType] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(categoryStats)
    .filter(key => categoryStats[key] > 0)
    .map(key => ({
      name: key,
      value: categoryStats[key]
    }));

  const barData = Object.keys(wasteTypeStats)
    .filter(key => wasteTypeStats[key] > 0)
    .map(key => ({
      name: key,
      value: wasteTypeStats[key],
      color: getWasteTypeColor(key),
    }));

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header สรุปข้อมูล [cite: 33, 34] */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 text-center">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Items Today</p>
            <p className="text-5xl font-extrabold text-emerald-600 mt-2">{records.filter(r => new Date(r.createdAt).toDateString() === new Date().toDateString()).length}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 text-center">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Items This Month</p>
            <p className="text-5xl font-extrabold text-blue-600 mt-2">{records.filter(r => new Date(r.createdAt).getMonth() === new Date().getMonth()).length}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 text-center">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Top Category</p>
            <p className="text-5xl font-extrabold text-purple-600 mt-2">
              {Object.keys(categoryStats).length > 0 ? Object.keys(categoryStats).reduce((a, b) => categoryStats[a] > categoryStats[b] ? a : b) : 'N/A'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">ปริมาณขยะแต่ละประเภท</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} interval={0} style={{ fontSize: '12px' }} />
                  <YAxis />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="value" fill="#8884d8" name="จำนวนชิ้น">
                    {barData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">สัดส่วนหมวดหมู่</h2>
            <div className="h-80 flex items-center justify-center">
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name as keyof typeof CATEGORY_COLORS]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center text-gray-400">
                  <p>ไม่มีข้อมูลสำหรับแสดง</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">รายละเอียดการตรวจจับล่าสุด</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-[#0F172A] text-white">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold">ประเภทขยะ</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">หมวดหมู่</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">ความมั่นใจ</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">ถังที่แนะนำ</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">วันที่บันทึก</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {records.slice(0, 10).map((record) => (
                  <tr key={record.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">{record.wasteType}</td>
                    <td className="py-3 px-4">{record.category}</td>
                    <td className="py-3 px-4">
                      {record.confidence > 1
                        ? record.confidence.toFixed(1)      // กรณีเก็บเป็น 0-100 แล้ว
                        : (record.confidence * 100).toFixed(1)  // กรณีเก็บเป็น 0-1
                      }%
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className="w-5 h-5 rounded-full inline-block mr-2"
                        style={{ backgroundColor: CATEGORY_COLORS[record.category as keyof typeof CATEGORY_COLORS] || '#6B7280' }}
                      ></span>
                      {record.binColor}
                    </td>
                    <td className="py-3 px-4">{new Date(record.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}