export function Sidebar() {
  const menuItems = [
    { label: "แดชบอร์ดภาพรวม", active: true },
    { label: "คลังพัสดุและครุภัณฑ์", active: false },
    { label: "ใบเบิกพัสดุ", badge: "14", active: false },
    { label: "หมวดหมู่พัสดุ", active: false },
    { label: "ประวัติรับ-จ่าย (Stock)", active: false },
    { label: "การอนุมัติ (Executive)", active: false },
  ];

  return (
    <aside className="w-64 glass-panel border-r border-white/10 hidden md:flex flex-col justify-between p-4 sticky top-0 h-screen">
      <div>
        <div className="flex items-center gap-3 px-2 py-3 mb-6 border-b border-white/10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-blue-500/25 border border-white/20">
            ม
          </div>
          <div>
            <div className="font-semibold text-sm tracking-wide text-white">ระบบพัสดุครุภัณฑ์</div>
            <div className="text-xs text-blue-300/80">เทศบาลตำบล / เมือง</div>
          </div>
        </div>

        <nav className="space-y-1.5 text-sm font-medium">
          {menuItems.map((item, idx) => (
            <a
              key={idx}
              href="#"
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                item.active
                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {item.badge}
                </span>
              )}
            </a>
          ))}
        </nav>
      </div>

      <div className="glass-card p-3 border border-white/10 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-xs text-white">
          อน
        </div>
        <div>
          <div className="text-xs font-semibold text-white">อนุชา ดวงดี</div>
          <div className="text-[11px] text-emerald-400 font-medium">เจ้าหน้าที่พัสดุ (ADMIN)</div>
        </div>
      </div>
    </aside>
  );
}
