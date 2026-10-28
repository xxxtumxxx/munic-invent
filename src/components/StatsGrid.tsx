export function StatsGrid() {
  const stats = [
    { title: "วัสดุทั้งหมด", value: "34", unit: "รายการ", note: "จัดหมวดหมู่แล้ว", color: "from-blue-500/20 to-cyan-500/10", border: "border-blue-500/30" },
    { title: "รายการรับเข้าเดือนนี้", value: "12", unit: "รายการ", note: "มูลค่า 15,400 บาท", color: "from-emerald-500/20 to-teal-500/10", border: "border-emerald-500/30" },
    { title: "รายการจ่ายออกเดือนนี้", value: "28", unit: "รายการ", note: "จ่ายแล้ว 8 หน่วยงาน", color: "from-purple-500/20 to-pink-500/10", border: "border-purple-500/30" },
    { title: "วัสดุยอดคงเหลือน้อย", value: "3", unit: "รายการ", note: "ควรสั่งซื้อเพิ่ม", color: "from-amber-500/20 to-orange-500/10", border: "border-amber-500/30" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className={`glass-card-interactive p-5 bg-gradient-to-br ${stat.color} border ${stat.border}`}>
          <div className="text-xs font-medium text-slate-300">{stat.title}</div>
          <div className="flex items-baseline gap-2 mt-2">
            <div className="text-3xl font-extrabold text-white">{stat.value}</div>
            <div className="text-xs text-slate-400">{stat.unit}</div>
          </div>
          <div className="mt-3 text-xs text-slate-400">{stat.note}</div>
        </div>
      ))}
    </div>
  );
}
