"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createConsumableItem, getCategories, getUnits, uploadImageAction } from "@/lib/actions";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function NewMaterialPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<{id:string; name:string}[]>([]);
  const [units, setUnits] = useState<{id:string; name:string}[]>([]);
  
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [specification, setSpecification] = useState("");
  const [unit, setUnit] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    }
  };
  const [unitPrice, setUnitPrice] = useState("");
  const [balanceForward, setBalanceForward] = useState("0");
  const [minStock, setMinStock] = useState("0");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getCategories().then(setCategories);
    getUnits().then(setUnits);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !categoryId || !unit) return;
    
    setIsSubmitting(true);
    try {
      let imageUrl = undefined;
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        const uploadedUrl = await uploadImageAction(formData);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      await createConsumableItem({
        name,
        categoryId,
        specification,
        unitId: unit,
        unitPrice: unitPrice ? Number(unitPrice) : undefined,
        balanceForward: Number(balanceForward),
        minStock: Number(minStock),
        imageUrl,
      });
      router.push("/materials");
      router.refresh();
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col p-4 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
        <Header />
        
        <div className="flex items-center gap-3">
          <Link href="/materials" className="text-slate-400 hover:text-white transition-colors">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">รูปภาพวัสดุ (ถ้ามี)</label>
              <div className="flex items-center gap-4">
                <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-white/10 border-dashed rounded-xl cursor-pointer hover:bg-white/5 transition-colors overflow-hidden relative">
                  {imagePreview ? (
                    <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-6 h-6 text-slate-400 mb-2" />
                      <p className="text-xs text-slate-400">อัปโหลดรูปภาพ</p>
                    </div>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              </div>
            </div>
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-white">เพิ่มวัสดุใหม่</h1>
        </div>
        
        <div className="glass-panel-elevated rounded-2xl border border-white/10 p-6 max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">หมวดหมู่ <span className="text-rose-400">*</span></label>
              <select required value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500/50">
                <option value="" disabled className="text-black">เลือกหมวดหมู่...</option>
                {categories.map((c) => (<option key={c.id} value={c.id} className="text-black">{c.name}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">ชื่อ/ชนิดวัสดุ <span className="text-rose-400">*</span></label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500/50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">ขนาด/ลักษณะ (รายละเอียด)</label>
              <input type="text" value={specification} onChange={(e) => setSpecification(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500/50" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">หน่วยนับ <span className="text-rose-400">*</span></label>
                <select required value={unit} onChange={(e) => setUnit(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500/50">
                  <option value="" disabled className="text-black">เลือกหน่วยนับ...</option>
                  {units.map((u) => (<option key={u.id} value={u.id} className="text-black">{u.name}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">ราคาต่อหน่วย (บาท)</label>
                <input type="number" step="0.01" min="0" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500/50" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">ยอดยกมา (จำนวนเริ่มต้น)</label>
                <input type="number" min="0" required value={balanceForward} onChange={(e) => setBalanceForward(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">จุดเตือนขั้นต่ำ</label>
                <input type="number" min="0" required value={minStock} onChange={(e) => setMinStock(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500/50" />
              </div>
            </div>
            <div className="pt-4 flex justify-end">
              <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl transition-colors font-medium shadow-lg shadow-blue-500/20 disabled:opacity-50">
                {isSubmitting ? "กำลังบันทึก..." : "บันทึกวัสดุใหม่"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}