"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCategory, updateCategory, deleteCategory } from "@/lib/actions";
import { PlusCircle, Edit2, Trash2, X, Check } from "lucide-react";

type Category = {
  id: string;
  name: string;
};

export function CategoriesClient({ initialCategories }: { initialCategories: Category[] }) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!newName.trim()) return;
    setLoading(true);
    try {
      const newCat = await createCategory(newName.trim());
      setCategories([...categories, newCat].sort((a, b) => a.name.localeCompare(b.name)));
      setNewName("");
      setIsAdding(false);
      router.refresh();
    } catch (err: any) {
      alert("เกิดข้อผิดพลาดในการเพิ่มหมวดหมู่");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editName.trim()) return;
    setLoading(true);
    try {
      const updated = await updateCategory(id, editName.trim());
      setCategories(categories.map(c => c.id === id ? updated : c).sort((a, b) => a.name.localeCompare(b.name)));
      setEditingId(null);
      setEditName("");
      router.refresh();
    } catch (err: any) {
      alert("�เกิดข้อผิดพลาดในการแก้ไขหมวดหมู่");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("คุณแน่ใจหรือไม่ว่าต้องการลบหมวดหมู่นี้?")) return;
    setLoading(true);
    try {
      const res = await deleteCategory(id);
      if (res.success) {
        setCategories(categories.filter(c => c.id !== id));
        router.refresh();
      } else {
        alert(res.error || "�เกิดข้อผิดพลาดในการลบหมวดหมู่");
      }
    } catch (err: any) {
      alert("�เกิดข้อผิดพลาดในการลบหมวดหมู่");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel p-6 border border-white/10 rounded-2xl">
      <div className="flex justify-end mb-6">
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl transition-colors font-medium text-sm shadow-lg shadow-blue-500/20"
          >
            <PlusCircle className="w-4 h-4" />
            เพิ่มหมวดหมู่
          </button>
        )}
      </div>

      {isAdding && (
        <div className="flex items-center gap-3 mb-4 p-4 bg-white/5 border border-white/10 rounded-xl">
          <input
            type="text"
            placeholder="ชื่อหมวดหมู่ใหม่..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500/50"
            autoFocus
          />
          <button
            onClick={handleAdd}
            disabled={loading || !newName.trim()}
            className="p-2 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 rounded-lg transition-colors disabled:opacity-50"
          >
            <Check className="w-5 h-5" />
          </button>
          <button
            onClick={() => { setIsAdding(false); setNewName(""); }}
            disabled={loading}
            className="p-2 bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 rounded-lg transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="space-y-2">
        {categories.map(category => (
          <div key={category.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
            {editingId === category.id ? (
              <div className="flex-1 flex items-center gap-3 mr-4">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleUpdate(category.id)}
                  className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500/50"
                  autoFocus
                />
              </div>
            ) : (
              <div className="text-white font-medium">{category.name}</div>
            )}

            <div className="flex items-center gap-2">
              {editingId === category.id ? (
                <>
                  <button
                    onClick={() => handleUpdate(category.id)}
                    disabled={loading || !editName.trim()}
                    className="p-2 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => { setEditingId(null); setEditName(""); }}
                    disabled={loading}
                    className="p-2 bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { setEditingId(category.id); setEditName(category.name); }}
                    disabled={loading}
                    className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    disabled={loading}
                    className="p-2 text-rose-400 hover:bg-rose-500/20 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
        {categories.length === 0 && !isAdding && (
          <div className="text-center py-8 text-slate-400">
            ยังไม่มีหมวดหมู่
          </div>
        )}
      </div>
    </div>
  );
}