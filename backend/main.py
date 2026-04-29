"""
FastAPI Backend — Recycle Waste Detection
วาง best.pt ไว้ใน folder เดียวกับไฟล์นี้
รันด้วย: uvicorn main:app --reload --port 8000
"""

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
import base64, cv2, numpy as np

app = FastAPI(title="Waste Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# โหลดโมเดล
try:
    model = YOLO("best.pt")
    print(f"✅ โหลดโมเดลสำเร็จ — classes: {list(model.names.values())}")
except Exception as e:
    print(f"❌ โหลดโมเดลไม่สำเร็จ: {e}")
    model = None

# แมปชื่อ class (EN) → สีถัง + คำแนะนำ
# ปรับให้ตรงกับ class ที่ train ไว้ และ waste-logic.ts
WASTE_INFO = {
    "plastic":    {"bin": "yellow", "binTh": "เหลือง", "tip": "ล้างให้สะอาดก่อนทิ้ง"},
    "paper":      {"bin": "yellow", "binTh": "เหลือง", "tip": "พับรวมกันก่อนทิ้ง"},
    "glass":      {"bin": "yellow", "binTh": "เหลือง", "tip": "ระวังเศษแก้วแตก"},
    "metal":      {"bin": "yellow", "binTh": "เหลือง", "tip": "บีบกระป๋องให้แบนก่อนทิ้ง"},
    "organic":    {"bin": "green",  "binTh": "เขียว",  "tip": "ทิ้งในถังขยะอินทรีย์"},
    "battery":    {"bin": "red",    "binTh": "แดง",    "tip": "นำไปจุดรับทิ้งแบตเตอรี่"},
    "e waste":    {"bin": "red",    "binTh": "แดง",    "tip": "นำส่งศูนย์รีไซเคิลอิเล็กทรอนิกส์"},
    "styrofoam":       {"bin": "blue",   "binTh": "น้ำเงิน","tip": "ทิ้งในถังขยะทั่วไป"},
    "clothes":   {"bin": "blue",   "binTh": "น้ำเงิน","tip": "บริจาคหากยังใช้ได้"},
    "Light bulb":    {"bin": "red",    "binTh": "แดง",    "tip": "นำส่งศูนย์รีไซเคิลอิเล็กทรอนิกส์"},
}

def get_info(class_name: str):
    return WASTE_INFO.get(
        class_name.lower(),
        {"bin": "blue", "binTh": "น้ำเงิน", "tip": "ทิ้งในถังขยะทั่วไป"}
    )


@app.get("/")
def root():
    return {
        "status": "running",
        "model_loaded": model is not None,
        "classes": list(model.names.values()) if model else [],
    }


@app.post("/detect")
async def detect(file: UploadFile = File(...)):
    if model is None:
        raise HTTPException(status_code=503, detail="โมเดลยังไม่ถูกโหลด กรุณาวาง best.pt ใน folder backend/")

    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img is None:
        raise HTTPException(status_code=400, detail="ไม่สามารถอ่านรูปภาพได้")

    results = model(img, conf=0.25, iou=0.45)[0]

    # วาด bounding box
    annotated = results.plot()
    _, buffer = cv2.imencode(".jpg", annotated, [cv2.IMWRITE_JPEG_QUALITY, 90])
    img_b64 = base64.b64encode(buffer).decode()

    detections = []
    for box in results.boxes:
        class_name = model.names[int(box.cls)]
        info = get_info(class_name)
        detections.append({
            "class":      class_name,
            "confidence": round(float(box.conf) * 100, 1),
            "bbox":       box.xyxy[0].tolist(),
            "bin":        info["bin"],
            "binTh":      info["binTh"],
            "tip":        info["tip"],
        })

    detections.sort(key=lambda x: x["confidence"], reverse=True)
    return {"image": img_b64, "detections": detections, "count": len(detections)}