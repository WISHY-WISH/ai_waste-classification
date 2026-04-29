export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold text-gray-800 uppercase tracking-wider text-sm mb-2">
              โครงการระบบตรวจจับประเภทขยะสำหรับรีไซเคิลด้วย AI
            </h3>
            <p className="text-gray-500 text-sm">
              วิทยาลัยการคอมพิวเตอร์ มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตภูเก็ต 
            </p>
          </div>
          <div className="md:text-right">
            <p className="text-gray-400 text-xs">
              จัดทำโดย ทีมวิศวกรซอฟต์แวร์ (Group 3) 
            </p>
            <p className="text-gray-400 text-xs mt-1">© 2026 AI Waste Detection System</p>
          </div>
        </div>
      </div>
    </footer>
  );
}