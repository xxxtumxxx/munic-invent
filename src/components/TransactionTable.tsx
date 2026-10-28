export function TransactionTable() {
  const recentTransactions = [
    { id: "1", date: "01/10/2567", type: "รับเข้า", category: "วัสดุสำนักงาน", name: "กระดาษถ่ายเอกสาร A4", spec: "Double A 80 แกรม", qty: 50, unit: "รีม", price: "135.00", sourceDest: "ร้านเครื่องเขียนพัฒนา", docNo: "PO-2567-001", badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
    { id: "2", date: "05/10/2567", type: "จ่ายออก", category: "วัสดุสำนักงาน", name: "กระดาษถ่ายเอกสาร A4", spec: "Double A 80 แกรม", qty: 10, unit: "รีม", price: "135.00", sourceDest: "สำนักปลัด (นาย ก.)", docNo: "REQ-2567-001", badge: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
    { id: "3", date: "10/10/2567", type: "จ่ายออก", category: "วัสดุไฟฟ้า", name: "หลอดไฟ LED 18W", spec: "แสงขาว", qty: 5, unit: "หลอด", price: "95.00", sourceDest: "กองช่าง (นาย ข.)", docNo: "REQ-2567-002", badge: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  ];

  const lowStock = [
    { code: "MAT-001", name: "แฟ้มเสนอประวัติ", category: "วัสดุสำนักงาน", stock: 4, min: 15, unit: "แฟ้ม" },
    { code: "MAT-002", name: "ปากกาลูกลื่น", category: "วัสดุสำนักงาน", stock: 10, min: 50, unit: "ด้าม" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 glass-panel rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">รายการรับ-จ่ายวัสดุล่าสุด</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="text-slate-400 border-b border-white/5 pb-2">
                <th className="py-2 font-medium">ว/ด/ป</th>
                <th className="py-2 font-medium">ประเภท</th>
                <th className="py-2 font-medium">ชื่อวัสดุ / ขนาด</th>
                <th className="py-2 font-medium text-right">จำนวน</th>
                <th className="py-2 font-medium">รับจาก/จ่ายให้</th>
                <th className="py-2 font-medium">เลขที่เอกสาร</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-white/[0.03]">
                  <td className="py-3 text-slate-300">{tx.date}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] border ${tx.badge}`}>{tx.type}</span>
                  </td>
                  <td className="py-3">
                    <div className="font-semibold text-blue-300">{tx.name}</div>
                    <div className="text-[10px] text-slate-400">{tx.spec} ({tx.category})</div>
                  </td>
                  <td className="py-3 text-right text-slate-200">{tx.qty} <span className="text-[10px] text-slate-400">{tx.unit}</span></td>
                  <td className="py-3 text-slate-300">{tx.sourceDest}</td>
                  <td className="py-3 text-slate-400 text-[11px]">{tx.docNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">แจ้งเตือนวัสดุใกล้หมด</h2>
          <div className="space-y-3">
            {lowStock.map((item) => (
              <div key={item.code} className="glass-card p-3 border border-white/10 flex justify-between items-center">
                <div>
                  <div className="text-xs font-semibold text-white">{item.name}</div>
                  <div className="text-[11px] text-slate-400">{item.category} • คงเหลือ {item.stock} {item.unit}</div>
                </div>
                <span className="text-xs text-rose-400 font-bold">จุดสั่งซื้อ: {item.min}</span>
              </div>
            ))}
          </div>
        </div>
        <button className="mt-4 w-full glass-card py-2.5 rounded-xl text-xs font-medium text-amber-300 border-amber-500/30 hover:bg-amber-500/10 transition-colors">
          + ดูรายงานทะเบียนคุมวัสดุ
        </button>
      </div>
    </div>
  );
}
