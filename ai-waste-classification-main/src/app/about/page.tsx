export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">ℹ️ เกี่ยวกับเรา</h1>
        <p className="text-gray-500 text-sm mb-6">ระบบจัดการทะเบียนสัตว์เลี้ยงหมู่บ้าน</p>

        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">🎯 วัตถุประสงค์</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              ระบบนี้สร้างขึ้นเพื่อช่วยชุมชนในการจัดเก็บและจัดการข้อมูลสัตว์เลี้ยงในหมู่บ้าน
              ทำให้ง่ายต่อการค้นหาเจ้าของสัตว์เลี้ยงและดูแลสุขภาพของสัตว์เลี้ยงในชุมชน
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">🐾 สัตว์เลี้ยงที่รองรับ</h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { emoji: '🐕', name: 'หมา', desc: 'สุนัขทุกสายพันธุ์' },
                { emoji: '🐈', name: 'แมว', desc: 'แมวทุกสายพันธุ์' },
                { emoji: '🐦', name: 'นก', desc: 'นกทุกชนิด' },
              ].map((item) => (
                <div key={item.name} className="bg-amber-50 rounded-xl p-4 text-center">
                  <div className="text-4xl mb-2">{item.emoji}</div>
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">⚙️ เทคโนโลยีที่ใช้</h2>
            <div className="space-y-2">
              {[
                { name: 'Next.js 14', desc: 'App Router + Server Components' },
                { name: 'Prisma ORM', desc: 'จัดการฐานข้อมูล SQLite' },
                { name: 'TailwindCSS', desc: 'Responsive Design' },
                { name: 'Zod', desc: 'Validation ทั้ง Frontend และ Backend' },
                { name: 'React Hook Form', desc: 'จัดการฟอร์ม' },
              ].map((tech) => (
                <div key={tech.name} className="flex items-center gap-3 text-sm">
                  <span className="font-medium text-green-700 w-36">{tech.name}</span>
                  <span className="text-gray-500">{tech.desc}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}