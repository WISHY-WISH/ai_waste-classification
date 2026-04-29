import Link from 'next/link';

export default function HomePage() {
  return (
<div className="space-y-16 py-10 bg-white">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          คัดแยกขยะอย่างชาญฉลาดด้วย <span className="text-emerald-500">AI</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          โครงการที่นำเทคโนโลยี Computer Vision และ Deep Learning มาช่วยคัดแยกขยะ 10 ประเภท 
          เพื่อสร้างสังคมที่ยั่งยืนและจัดการขยะในองค์กรได้อย่างรวดเร็ว 
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/detect" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg transition-all">
            เริ่มตรวจจับขยะ
          </Link>
          <Link href="/dashboard" className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-bold shadow-sm transition-all">
            ดูสรุปข้อมูล
          </Link>
        </div>
      </section>

      {/* Feature Highlights ตาม SRS 2.2 และ 3.1.1 */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-3xl mb-4" style={{ color: "#3B82F6" }}>🔍</div>
          <h3 className="text-xl font-bold mb-2">ตรวจจับ 10 ประเภท</h3>
          <p className="text-gray-500 text-sm">
            รองรับขยะตั้งแต่ พลาสติก, กระดาษ, ไปจนถึงขยะอิเล็กทรอนิกส์ (E-waste) 
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-3xl mb-4" style={{ color: "#F97316" }}>⚡</div>
          <h3 className="text-xl font-bold mb-2">แสดงผล Real-time</h3>
          <p className="text-gray-500 text-sm">
            ถ่ายภาพผ่านกล้องเพื่อรับผลการจำแนกประเภทและคำแนะนำการทิ้งขยะได้ทันที 
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-3xl mb-4" style={{ color: "#8B5CF6" }}>📊</div>
          <h3 className="text-xl font-bold mb-2">Dashboard สรุปผล</h3>
          <p className="text-gray-500 text-sm">
            บันทึกปริมาณขยะอัตโนมัติ เพื่อนำไปวิเคราะห์แนวโน้มการทิ้งขยะในระยะยาว 
          </p>
        </div>
      </section>

      {/* แนะนำสีถังขยะตาม WCF-REQ-03 [cite: 67] */}
      <section className="bg-green-50 p-8 rounded-3xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-800">แนะนำการคัดแยกเบื้องต้น</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div><div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2"></div><p className="text-xs font-bold">ขยะอินทรีย์</p></div>
          <div><div className="w-8 h-8 bg-yellow-400 rounded-full mx-auto mb-2"></div><p className="text-xs font-bold">ขยะรีไซเคิล</p></div>
          <div><div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2"></div><p className="text-xs font-bold">ขยะอันตราย</p></div>
          <div><div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2"></div><p className="text-xs font-bold">ขยะทั่วไป</p></div>
        </div>
      </section>
    </div>
  );
}