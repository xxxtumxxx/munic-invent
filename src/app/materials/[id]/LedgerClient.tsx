"use client";

import { useState } from "react";
import { PlusCircle, MinusCircle, Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createTransaction } from "@/lib/actions";
import { useRouter } from "next/navigation";

type ItemWithTransactions = any; 

export function LedgerClient({ item }: { item: ItemWithTransactions }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<"RECEIVE" | "ISSUE">("RECEIVE");
  
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [quantity, setQuantity] = useState("");
  const [sourceOrDest, setSourceOrDest] = useState("");
  const [docNo, setDocNo] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quantity || isNaN(Number(quantity)) || Number(quantity) <= 0) return;
    
    // Validate over-requisitioning for ISSUE
    if (transactionType === "ISSUE") {
      if (Number(quantity) > item.currentStock) {
        alert("ไม่สามารถเบิกจ่ายเกินจำนวนคงเหลือได้");
        return;
      }
    }

    setIsSubmitting(true);
    try {
      await createTransaction({
        itemId: item.id,
        type: transactionType,
        date: new Date(date),
        quantity: Number(quantity),
        sourceOrDestination: sourceOrDest,
        documentNo: docNo,
        notes,
      });
      setIsModalOpen(false);
      setQuantity(""); setSourceOrDest(""); setDocNo(""); setNotes("");
      router.refresh();
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Link href="/materials" className="text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold text-white">ทะเบียนคุมวัสดุคงเหลือ</h1>
          </div>
          <p className="text-slate-400 text-sm ml-8">แบบ อปท.-วส.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/reports?itemId=${item.id}`}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl transition-colors font-medium text-sm border border-white/10"
          >
            <Printer className="w-4 h-4" />
            พิมพ์รายงาน วส.
          </Link>
          <button
            onClick={() => { setTransactionType("RECEIVE"); setIsModalOpen(true); }}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl transition-colors font-medium text-sm shadow-lg shadow-emerald-500/20"
          >
            <PlusCircle className="w-4 h-4" />
            บันทึกรับเข้า
          </button>
          <button
            onClick={() => { setTransactionType("ISSUE"); setIsModalOpen(true); }}
            className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-xl transition-colors font-medium text-sm shadow-lg shadow-rose-500/20"
          >
            <MinusCircle className="w-4 h-4" />
            บันทึกจ่ายออก
          </button>
        </div>
      </div>

      <div className="glass-panel-elevated rounded-2xl border border-white/10 p-6 space-y-6">
        {/* Item Details Header */}
        <div className="flex flex-col md:flex-row gap-6 pb-6 border-b border-white/10">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.name} className="w-32 h-32 rounded-xl object-cover bg-white/5 border border-white/10 shrink-0" />
          ) : (
            <div className="w-32 h-32 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 text-sm shrink-0">
              ไม่มีรูปภาพ
            </div>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
            <div>
              <div className="text-sm text-slate-400">ชื่อวัสดุ</div>
              <div className="text-lg font-medium text-white">{item.name}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400">ขนาด/ลักษณะ</div>
              <div className="text-lg font-medium text-white">{item.specification || "-"}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400">หน่วยนับ</div>
              <div className="text-lg font-medium text-white">{item.unitName}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400">ราคาต่อหน่วย</div>
              <div className="text-lg font-medium text-white">
                {item.unitPrice ? `${item.unitPrice.toLocaleString()} บาท` : "-"}
              </div>
            </div>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="text-xs text-slate-400 uppercase bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-4 py-3 font-medium">วัน เดือน ปี</th>
                <th className="px-4 py-3 font-medium">รับจาก/จ่ายให้</th>
                <th className="px-4 py-3 font-medium">เลขที่เอกสาร</th>
                <th className="px-4 py-3 font-medium text-right text-emerald-400">รับ</th>
                <th className="px-4 py-3 font-medium text-right text-rose-400">จ่าย</th>
                <th className="px-4 py-3 font-medium text-right text-blue-400">คงเหลือ</th>
                <th className="px-4 py-3 font-medium">หมายเหตุ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="bg-white/[0.02]">
                <td colSpan={5} className="px-4 py-3 text-right font-medium text-slate-400">
                  ยอดยกมา
                </td>
                <td className="px-4 py-3 text-right font-bold text-white">
                  {item.balanceForward.toLocaleString()}
                </td>
                <td className="px-4 py-3"></td>
              </tr>
              {item.transactions.map((tx: any) => (
                <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">{new Date(tx.date).toLocaleDateString("th-TH")}</td>
                  <td className="px-4 py-3">{tx.sourceOrDestination || "-"}</td>
                  <td className="px-4 py-3">{tx.documentNo || "-"}</td>
                  <td className="px-4 py-3 text-right font-medium text-emerald-400">
                    {tx.type === "RECEIVE" ? tx.quantity.toLocaleString() : "-"}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-rose-400">
                    {tx.type === "ISSUE" ? tx.quantity.toLocaleString() : "-"}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-white">
                    {tx.balanceAfter.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-slate-500">{tx.notes || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0f1219] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className={`p-4 border-b border-white/10 ${transactionType === "RECEIVE" ? "bg-emerald-500/10" : "bg-rose-500/10"}`}>
              <h3 className={`text-lg font-semibold ${transactionType === "RECEIVE" ? "text-emerald-400" : "text-rose-400"}`}>
                {transactionType === "RECEIVE" ? "บันทึกรับเข้าวัสดุ" : "บันทึกจ่ายออกวัสดุ"}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">วันที่</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500/50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  จำนวน ({item.unitName})
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  {transactionType === "RECEIVE" ? "รับจาก (ชื่อร้าน/หน่วยงาน)" : "จ่ายให้ (ชื่อผู้เบิก/หน่วยงาน)"}
                </label>
                <input
                  type="text"
                  required
                  value={sourceOrDest}
                  onChange={(e) => setSourceOrDest(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">เลขที่เอกสาร</label>
                <input
                  type="text"
                  value={docNo}
                  onChange={(e) => setDocNo(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">หมายเหตุ</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500/50"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-white font-medium transition-colors ${
                    transactionType === "RECEIVE" 
                      ? "bg-emerald-600 hover:bg-emerald-500" 
                      : "bg-rose-600 hover:bg-rose-500"
                  } disabled:opacity-50`}
                >
                  {isSubmitting ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
