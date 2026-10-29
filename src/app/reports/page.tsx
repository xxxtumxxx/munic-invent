export const instant = false;

import { getConsumableItem, getConsumableItems, getCategories } from "@/lib/actions";
import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";
import { PrintButton } from "@/components/PrintButton";
import { notFound } from "next/navigation";

export default async function ReportPage({ searchParams }: { searchParams: Promise<{ itemId?: string }> }) {
  const { itemId } = await searchParams;

  if (!itemId) {
    const items = await getConsumableItems();
    return (
      <div className="p-8 max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/materials" className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-white">เลือกวัสดุเพื่อพิมพ์รายงาน วส.</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <Link key={item.id} href={`/reports?itemId=${item.id}`} className="glass-card p-4 hover:bg-white/5 transition-colors border border-white/10 rounded-xl">
              <div className="font-medium text-white">{item.name}</div>
              <div className="text-sm text-slate-400">หมวดหมู่: {item.category?.name || "-"} | คงเหลือ: {item.currentStock} {item.unitName}</div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  const item = await getConsumableItem(itemId);
  if (!item) notFound();

  // Print layout optimized for A4
  return (
    <div className="min-h-screen bg-white text-black p-8 font-sarabun print:p-0">
      {/* Print Controls (hidden when printing) */}
      <div className="mb-8 flex gap-4 print:hidden">
        <Link href={`/materials/${itemId}`} className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" />
          กลับไปสมุดคุม
        </Link>
        <PrintButton />
      </div>

      {/* A4 Container */}
      <div className="max-w-[21cm] mx-auto bg-white min-h-[29.7cm]">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-xl font-bold">ทะเบียนคุมทรัพย์สิน (วัสดุ)</h2>
          <h3 className="text-lg">ส่วนราชการ ..............................................................</h3>
          <p className="text-right text-sm mb-4">แบบ อปท.-วส.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="font-semibold">แผ่นที่:</span> .......
          </div>
          <div>
            <span className="font-semibold">หมวด:</span> {item.category?.name || "........................."}
          </div>
          <div>
            <span className="font-semibold">ชื่อ/ชนิดวัสดุ:</span> {item.name}
          </div>
          <div>
            <span className="font-semibold">ขนาด/ลักษณะ:</span> {item.specification || "-"}
          </div>
          <div>
            <span className="font-semibold">หน่วยนับ:</span> {item.unitName}
          </div>
          <div>
            <span className="font-semibold">ราคาต่อหน่วย:</span> {item.unitPrice ? `${item.unitPrice.toLocaleString()} บาท` : "-"}
          </div>
        </div>

        <table className="w-full border-collapse border border-black text-sm text-center">
          <thead>
            <tr>
              <th className="border border-black px-2 py-2 w-24">วัน เดือน ปี</th>
              <th className="border border-black px-2 py-2">รับจาก/จ่ายให้</th>
              <th className="border border-black px-2 py-2 w-24">เลขที่เอกสาร</th>
              <th className="border border-black px-2 py-2 w-20">รับ (จำนวน)</th>
              <th className="border border-black px-2 py-2 w-20">จ่าย (จำนวน)</th>
              <th className="border border-black px-2 py-2 w-20">คงเหลือ (จำนวน)</th>
              <th className="border border-black px-2 py-2 w-32">หมายเหตุ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black px-2 py-1">-</td>
              <td className="border border-black px-2 py-1 text-left">ยอดยกมา</td>
              <td className="border border-black px-2 py-1">-</td>
              <td className="border border-black px-2 py-1">-</td>
              <td className="border border-black px-2 py-1">-</td>
              <td className="border border-black px-2 py-1 font-bold">{item.balanceForward.toLocaleString()}</td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            {item.transactions.map((tx: any) => (
              <tr key={tx.id}>
                <td className="border border-black px-2 py-1">{new Date(tx.date).toLocaleDateString("th-TH")}</td>
                <td className="border border-black px-2 py-1 text-left">{tx.sourceOrDestination || "-"}</td>
                <td className="border border-black px-2 py-1">{tx.documentNo || "-"}</td>
                <td className="border border-black px-2 py-1">{tx.type === "RECEIVE" ? tx.quantity.toLocaleString() : "-"}</td>
                <td className="border border-black px-2 py-1">{tx.type === "ISSUE" ? tx.quantity.toLocaleString() : "-"}</td>
                <td className="border border-black px-2 py-1 font-bold">{tx.balanceAfter.toLocaleString()}</td>
                <td className="border border-black px-2 py-1 text-left text-xs">{tx.notes || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}