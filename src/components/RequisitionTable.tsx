export function RequisitionTable() {
  const recentRequisitions = [
    { id: "REQ-2567-0182", dept: "สำนักปลัด", requester: "สมชาย รักษาการ", items: "กระดาษ A4 10 รีม", urgency: "ปกติ", status: "อนุมัติแล้ว", badge: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
    { id: "REQ-2567-0181", dept: "กองช่าง", requester: "อนุชา งานสร้าง", items: "หลอดไฟ LED 20 หลอด", urgency: "ด่วน", status: "รออนุมัติ", badge: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
    { id: "REQ-2567-0180", dept: "กองสาธารณสุข", requester: "วิภาวี อนามัยดี", items: "ถุงขยะดำ 15 แพ็ค", urgency: "ด่วนที่สุด", status: "จ่ายพัสดุแล้ว", badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  ];

  const lowStock = [
    { code: "MAT-OFF-004", name: "กระดาษ A4 Double A", dept: "วัสดุสำนักงาน", stock: 4, min: 15, unit: "รีม" },
    { code: "MAT-COM-012", name: "หมึก Brother TN", dept: "วัสดุคอมพิวเตอร์", stock: 1, min: 5, unit: "ตลับ" },
    { code: "MAT-ENG-025", name: "หลอดไฟ LED E27", dept: "วัสดุไฟฟ้า", stock: 6, min: 20, unit: "หลอด" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 glass-panel rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">คำขอเบิกพัสดุล่าสุด</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-white/5 pb-2">
                <th className="py-2 font-medium">เลขที่ใบเบิก</th>
                <th className="py-2 font-medium">ผู้ขอ</th>
                <th className="py-2 font-medium">รายการ</th>
                <th className="py-2 font-medium">ความเร่งด่วน</th>
                <th className="py-2 font-medium text-right">สถานะ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentRequisitions.map((req) => (
                <tr key={req.id} className="hover:bg-white/[0.03]">
                  <td className="py-3 font-semibold text-blue-300">{req.id}</td>
                  <td className="py-3 text-slate-200">{req.requester} ({req.dept})</td>
                  <td className="py-3 text-slate-300">{req.items}</td>
                  <td className="py-3"><span className="px-2 py-0.5 rounded-full text-[10px] bg-white/10 text-slate-300">{req.urgency}</span></td>
                  <td className="py-3 text-right"><span className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${req.badge}`}>{req.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">แจ้งเตือนสต็อกใกล้หมด</h2>
          <div className="space-y-3">
            {lowStock.map((item) => (
              <div key={item.code} className="glass-card p-3 border border-white/10 flex justify-between items-center">
                <div>
                  <div className="text-xs font-semibold text-white">{item.name}</div>
                  <div className="text-[11px] text-slate-400">{item.dept} • คงเหลือ {item.stock} {item.unit}</div>
                </div>
                <span className="text-xs text-rose-400 font-bold">เกณฑ์: {item.min}</span>
              </div>
            ))}
          </div>
        </div>
        <button className="mt-4 w-full glass-card py-2.5 rounded-xl text-xs font-medium text-amber-300 border-amber-500/30 hover:bg-amber-500/10 transition-colors">
          + เปิดคำสั่งจัดซื้อพัสดุเติมสต็อก
        </button>
      </div>
    </div>
  );
}
