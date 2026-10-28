export const instant = false;

import { getConsumableItem } from "@/lib/actions";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { LedgerClient } from "./LedgerClient";
import { notFound } from "next/navigation";

export default async function MaterialLedgerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getConsumableItem(id);

  if (!item) {
    notFound();
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col p-4 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
        <Header />
        <LedgerClient item={item} />
      </main>
    </div>
  );
}