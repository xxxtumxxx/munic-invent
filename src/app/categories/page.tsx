export const instant = false;


import { getCategories } from "@/lib/actions";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { CategoriesClient } from "./CategoriesClient";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col p-4 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
        <Header />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">จัดการหมวดหมู่</h1>
            <p className="text-slate-400 text-sm mt-1">เพิ่ม แก้ไข และลบหมวดหมู่วัสดุ</p>
          </div>
        </div>

        <CategoriesClient initialCategories={categories} />
      </main>
    </div>
  );
}
