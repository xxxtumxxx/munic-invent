"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, AlertCircle, FileText } from "lucide-react";

export function MaterialsTableClient({ items, categories }: { items: any[], categories: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = categoryId ? item.categoryId === categoryId : true;
      return matchSearch && matchCategory;
    });
  }, [items, searchTerm, categoryId]);

  return (
    <div className="glass-panel-elevated rounded-2xl border border-white/10 overflow-hidden">
      <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="ค้นหาชื่อวัสดุ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
          />
        </div>
        
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full sm:w-auto bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50"
        >
          <option value="" className="text-black">ทุกหมวดหมู่</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id} className="text-black">{c.name}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-300">
          <thead className="text-xs text-slate-400 uppercase bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-4 py-3 font-medium">รหัส / ชื่อวัสดุ</th>
              <th className="px-4 py-3 font-medium">หมวดหมู่</th>
              <th className="px-4 py-3 font-medium">หน่วยนับ</th>
              <th className="px-4 py-3 font-medium text-right">คงเหลือ</th>
              <th className="px-4 py-3 font-medium text-center">สถานะ</th>
              <th className="px-4 py-3 font-medium text-right">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                  ไม่พบข้อมูลวัสดุ
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => {
                const isLowStock = item.currentStock <= item.minStock;
                return (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 flex items-center gap-3">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="w-10 h-10 rounded-lg object-cover bg-white/5 border border-white/10" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 text-xs">
                          No Img
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-white">{item.name}</div>
                        <div className="text-xs text-slate-500">{item.specification || "-"}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{item.category?.name || "-"}</td>
                    <td className="px-4 py-3">{item.unitName}</td>
                    <td className="px-4 py-3 text-right font-medium">
                      {item.currentStock.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {isLowStock ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-rose-500/20 text-rose-400 text-xs font-medium border border-rose-500/20">
                          <AlertCircle className="w-3 h-3" />
                          ใกล้หมด
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                          ปกติ
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/materials/${item.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors text-xs font-medium border border-white/10"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        สมุดคุม
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}