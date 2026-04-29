import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { imageUrl, wasteType, category, confidence, binColor } = body;

    // ตรวจสอบความครบถ้วนของข้อมูลตาม SRS (WCF-REQ-01 ถึง 03)
    if (!imageUrl || !wasteType || !category) {
      return NextResponse.json({ error: "ข้อมูลไม่ครบถ้วน" }, { status: 400 });
    }

    // บันทึกลง Database
    const newRecord = await prisma.wasteRecord.create({
      data: {
        imageUrl,
        wasteType,
        category,
        confidence: parseFloat(confidence),
        binColor,
      },
    });

    return NextResponse.json(newRecord, { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "เกิดข้อผิดพลาดในการบันทึกข้อมูล" }, { status: 500 });
  }
}

// ฟังก์ชัน GET สำหรับดึงข้อมูลไปโชว์ใน Dashboard (UC400)
export async function GET() {
  try {
    const records = await prisma.wasteRecord.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(records);
  } catch (error) {
    return NextResponse.json({ error: "ดึงข้อมูลไม่สำเร็จ" }, { status: 500 });
  }
}