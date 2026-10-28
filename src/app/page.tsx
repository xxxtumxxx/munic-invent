import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { StatsGrid } from "@/components/StatsGrid";
import { TransactionTable } from "@/components/TransactionTable";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col p-4 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
        <Header />
        <StatsGrid />
        <TransactionTable />

        <div className="glass-panel-elevated rounded-2xl p-5 border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-white">โครงสร้างฐานข้อมูล Consumables Inventory</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              ตาราง OrganizationInfo, Category, ConsumableItem, ConsumableTransaction (Prisma 6) พร้อมใช้งาน
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
              Docker Compose Ready
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 font-medium">
              Prisma 6 Configured
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
