export const instant = false;

import { getConsumableItems, getCategories } from "@/lib/actions";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { PlusCircle } from "lucide-react";
import { MaterialsTableClient } from "./MaterialsTableClient";

export default async function MaterialsPage() {
  const items = await getConsumableItems();
  const categories = await getCategories();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col p-4 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
        <Header />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">ทะเบียนคุมวัสดุคงเหลือ</h1>
            <p className="text-slate-400 text-sm mt-1">รายการวัสดุทั้งหมดในระบบ และจำนวนคงเหลือปัจจุบัน</p>
          </div>
          <Link
            href="/materials/new"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl transition-colors font-medium text-sm shadow-lg shadow-blue-500/20"
          >
            <PlusCircle className="w-4 h-4" />
            เพิ่มวัสดุใหม่
          </Link>
        </div>

        <MaterialsTableClient items={items} categories={categories} />
      </main>
    </div>
  );
}