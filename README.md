# 🗑️ AI Waste Classification

ระบบตรวจจับและคัดแยกขยะด้วย AI โดยใช้ YOLOv8 + Next.js

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Python](https://img.shields.io/badge/Python-3.9+-blue?logo=python)
![YOLOv8](https://img.shields.io/badge/YOLOv8-ultralytics-purple)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)

---

## ✨ ฟีเจอร์

- 🔍 ตรวจจับขยะ 10 ประเภทด้วย YOLOv8
- 📸 อัปโหลดรูปหรือใช้กล้อง Realtime
- 🎯 แสดง Bounding Box พร้อม Confidence Score
- ♻️ แนะนำถังขยะที่ถูกต้อง (เขียว / เหลือง / แดง / น้ำเงิน)
- 📊 Dashboard สรุปสถิติการทิ้งขยะ
- 💾 บันทึกประวัติลงฐานข้อมูล

---

## 🛠️ สิ่งที่ต้องติดตั้งก่อน

| โปรแกรม | Version | ดาวน์โหลด |
|---------|---------|-----------|
| Node.js | 18+     | https://nodejs.org |
| Python  | 3.9+    | https://python.org |
| Git     | ล่าสุด  | https://git-scm.com |

---

## 🚀 วิธีติดตั้งและรัน

### 1. Clone โปรเจกต์

```bash
git clone https://github.com/xinwza007x/ai-waste-classification.git
cd ai-waste-classification
```

---

### 2. ติดตั้ง Frontend (Next.js)

```bash
npm install
```

ตั้งค่าฐานข้อมูล:

```bash
npx prisma generate
npx prisma db push
```

---

### 3. ติดตั้ง Backend (FastAPI + YOLOv8)

```bash
cd backend
pip install -r requirements.txt
```

---

### 4. วางไฟล์โมเดล

ดาวน์โหลดไฟล์ `best.pt` จากลิงก์ด้านล่าง แล้ววางไว้ใน folder `backend/`

> 📥 **[ดาวน์โหลด best.pt](https://drive.google.com/your-link-here)** ← เปลี่ยนเป็นลิงก์จริง

```
backend/
├── main.py
├── requirements.txt
└── best.pt     ← วางตรงนี้
```

> ⚠️ ไม่ได้อัปโหลด `best.pt` ขึ้น GitHub เนื่องจากไฟล์มีขนาดใหญ่เกิน

---

### 5. รันระบบ

เปิด **2 Terminal** พร้อมกัน:

**Terminal 1 — Backend:**
```bash
cd backend
python -m uvicorn main:app --reload --port 8000
```

ตรวจสอบว่า backend ทำงาน: เปิด http://localhost:8000
จะเห็น `{"status":"running","model_loaded":true,...}`

**Terminal 2 — Frontend:**
```bash
cd ai-waste-classification
npm run dev
```

เปิดเว็บที่ **http://localhost:3000** 🎉

---

## 📁 โครงสร้างโปรเจกต์

```
ai-waste-classification/
├── src/
│   └── app/
│       ├── page.tsx              # หน้าหลัก
│       ├── detect/
│       │   └── page.tsx          # หน้าตรวจจับขยะ
│       ├── dashboard/
│       │   └── page.tsx          # หน้า Dashboard
│       ├── login/
│       │   └── page.tsx          # หน้า Login
│       └── api/
│           ├── detect/
│           │   └── route.ts      # API ส่งรูปไป AI
│           └── waste/
│               └── route.ts      # API บันทึก/ดึงข้อมูล
├── prisma/
│   └── schema.prisma             # โครงสร้างฐานข้อมูล
├── backend/
│   ├── main.py                   # FastAPI + YOLOv8
│   ├── requirements.txt          # Python dependencies
│   └── best.pt                   # โมเดล (ดาวน์โหลดแยก)
└── README.md
```

---

## 🗂️ ประเภทขยะที่รองรับ

| ประเภท | หมวดหมู่ | ถังที่แนะนำ |
|--------|----------|------------|
| พลาสติก, แก้ว, โลหะ, กระดาษ | ขยะรีไซเคิล | 🟡 เหลือง |
| ขยะอินทรีย์, เศษอาหาร | ขยะอินทรีย์ | 🟢 เขียว |
| แบตเตอรี่, หลอดไฟ, ขยะอิเล็กทรอนิกส์ | ขยะอันตราย | 🔴 แดง |
| โฟม, เสื้อผ้า | ขยะทั่วไป | 🔵 น้ำเงิน |

---

## ❓ แก้ปัญหาที่พบบ่อย

**`uvicorn` ไม่รู้จัก**
```bash
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

**หน้า detect ขึ้น "ไม่สามารถเชื่อมต่อกับ AI Server"**
- ตรวจสอบว่า Terminal 1 (backend) รันอยู่
- เปิด http://localhost:8000 ดูว่าตอบกลับมั้ย

**`npx prisma db push` error**
```bash
# ลบไฟล์ฐานข้อมูลเก่าแล้วสร้างใหม่
del prisma\dev.db        # Windows
rm prisma/dev.db         # Mac/Linux
npx prisma db push
```

**โมเดลโหลดไม่ได้ / `best.pt` not found**
- ตรวจสอบว่าวาง `best.pt` ไว้ใน folder `backend/` แล้ว

---

## 👥 ทีมพัฒนา

โปรเจกต์นี้พัฒนาเพื่อการศึกษา — หากมีคำถามเปิด Issue ได้เลยครับ
