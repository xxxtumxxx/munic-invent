"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUnit, updateUnit, deleteUnit } from "@/lib/actions";
import { PlusCircle, Edit2, Trash2, X, Check } from "lucide-react";

type Unit = { id: string; name: string; };

export function UnitsClient({ initialUnits }: { initialUnits: Unit[] }) {
  const router = useRouter();
  const [units, setUnits] = useState<Unit[]>(initialUnits);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!newName.trim()) return;
    setLoading(true);
    try {
      const newUnit = await createUnit(newName.trim());
      setUnits([...units, newUnit].sort((a, b) => a.name.localeCompare(b.name)));
      setNewName(""); setIsAdding(false); router.refresh();
    } catch { alert("เกิดข้อผิดพลาดในการเพิ่มหน่วยนับ"); } finally { setLoading(false); }
  };

  const handleUpdate = async (id: string) => {
    if (!editName.trim()) return;
    setLoading(true);
    try {
      const updated = await updateUnit(id, editName.trim());
      setUnits(units.map(u => u.id 
      === id ? updated : u).sort((a, b) => a.name.localeCompare(b.name)));
      setEditingId(null); setEditName(""); router.refresh();
    } catch { alert("เกิดข้อผิดพลาดในการแก้ไขหน่วยนับ"); } finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("คุณแน่ใจหรือไม่ว่าต้องการลบหน่วยนับนี้?")) return;
    setLoading(true);
    try {
      const res = await deleteUnit(id);
      if (res.success) {
        setUnits(units.filter(u => u.id !== id)); router.refresh();
      } else alert(res.error || "�เกิดข้อผิดพลาด");
    } catch { alert("�เกิดข้อผิดพลาดในการลบหน่วยนับ"); } finally { setLoading(false); }
  };

  return (
    <div className="glass-panel p-6 border border-white/10 rounded-2xl">
      <div className="flex justify-end mb-6">
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl transition-colors font-medium text-sm shadow-lg shadow-blue-500/20">
            <PlusCircle className="w-4 h-4" /> เพิ่มหน่วยนับ
          </button>
        )}
      </div>
      {isAdding && (
        <div className="flex items-center gap-3 mb-4 p-4 bg-white/5 border border-white/10 rounded-xl">
          <input type="text" placeholder="ชื่อหน่วยนับใหม่..." value={newName} onChange={(e) => setNewName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAdd()} className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500/50" autoFocus />
          <button onClick={handleAdd} disabled={loading || !newName.trim()} className="p-2 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 rounded-lg transition-colors disabled:opacity-50"><Check className="w-5 h-5" /></button>
          <button onClick={() => { setIsAdding(false); setNewName(""); }} disabled={loading} className="p-2 bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 rounded-lg transition-colors disabled:opacity-50"><X className="w-5 h-5" /></button>
        </div>
      )}
      <div className="space-y-2">
        {units.map(unit => (
          <div key={unit.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
            {editingId === unit.id ? (
              <div className="flex-1 flex items-center gap-3 mr-4">
                <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleUpdate(unit.id)} className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500/50" autoFocus />
              </div>
            ) : <div className="text-white font-medium">{unit.name}</div>}
            <div className="flex items-center gap-2">
              {editingId === unit.id ? (
                <>
                  <button onClick={() => handleUpdate(unit.id)} disabled={loading || !editName.trim()} className="p-2 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 rounded-lg transition-colors disabled:opacity-50"><Check className="w-4 h-4" /></button>
                  <button onClick={() => { setEditingId(null); setEditName(""); }} disabled={loading} className="p-2 bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 rounded-lg transition-colors disabled:opacity-50"><X className="w-4 h-4" /></button>
                </>
              ) : (
                <>
                  <button onClick={() => { setEditingId(unit.id); setEditName(unit.name); }} disabled={loading} className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors disabled:opacity-50"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(unit.id)} disabled={loading} className="p-2 text-rose-400 hover:bg-rose-500/20 rounded-lg transition-colors disabled:opacity-50"><Trash2 className="w-4 h-4" /></button>
                </>
              )}
            </div>
          </div>
        ))}
        {units.length === 0 && !isAdding && <div className="text-center py-8 text-slate-400">ยังไม่มีหน่วยนับ</div>}
      </div>
    </div>
  );
}
