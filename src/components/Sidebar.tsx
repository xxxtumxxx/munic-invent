"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { label: "Dashboard / ภาพรวมสต็อก", href: "/" },
    { label: "ทะเบียนคุมวัสดุคงเหลือ", href: "/materials" },
    { label: "รายงานแบบ อปท.-วส.", href: "/reports" },
    { label: "จัดการหมวดหมู่", href: "/categories" },
    { label: "จัดการหน่วยนับ", href: "/units" },
  ];

  return (
    <aside className="w-64 glass-panel border-r border-white/10 hidden md:flex flex-col justify-between p-4 sticky top-0 h-screen">
      <div>
        <div className="flex items-center gap-3 px-2 py-3 mb-6 border-b border-white/10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-blue-500/25 border border-white/20">
            วส
          </div>
          <div>
            <div className="font-semibold text-sm tracking-wide text-white">ระบบจัดการวัสดุ</div>
            <div className="text-xs text-blue-300/80">เทศบาลตำบล / เมือง</div>
          </div>
        </div>

        <nav className="space-y-1.5 text-sm font-medium">
          {menuItems.map((item, idx) => {
            const active = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <Link
                key={idx}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                  active
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="glass-card p-3 border border-white/10 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-xs text-white">
          พด
        </div>
        <div>
          <div className="text-xs font-semibold text-white">เจ้าหน้าที่พัสดุ</div>
          <div className="text-[11px] text-emerald-400 font-medium">ผู้ดูแลระบบ (ADMIN)</div>
        </div>
      </div>
    </aside>
  );
}

