export function Header() {
  return (
    <header className="glass-panel rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
          <span className="text-xs font-medium text-emerald-300 uppercase tracking-wider">Consumables Inventory • Active</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
          ระบบบริหารจัดการวัสดุ
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          ระบบบันทึกรับ-จ่าย และทะเบียนคุมวัสดุคงเหลือ อปท. (ตามแบบ วส.)
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button className="glass-button-primary px-4 py-2.5 rounded-xl text-white text-sm font-medium">
          + บันทึกรับ-จ่าย
        </button>
        <button className="glass-card px-4 py-2.5 rounded-xl text-slate-200 hover:text-white text-sm font-medium">
          พิมพ์รายงาน วส.
        </button>
      </div>
    </header>
  );
}
