"use server";

import { prisma } from "./prisma";
import { TransactionType } from "@prisma/client";
import { writeFile } from "fs/promises";
import { join } from "path";

// --- CATEGORIES ---
export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}

// --- CONSUMABLE ITEMS ---
export async function getConsumableItems() {
  const items = await prisma.consumableItem.findMany({
    include: {
      category: true,
      transactions: true,
    },
    orderBy: { name: "asc" },
  });

  // Calculate current stock for each item
  return items.map((item) => {
    let currentStock = item.balanceForward;
    item.transactions.forEach((tx) => {
      if (tx.type === "RECEIVE") {
        currentStock += tx.quantity;
      } else if (tx.type === "ISSUE") {
        currentStock -= tx.quantity;
      }
    });

    return {
      ...item,
      unitPrice: item.unitPrice ? Number(item.unitPrice) : null,
      currentStock,
    };
  });
}

export async function getConsumableItem(id: string) {
  const item = await prisma.consumableItem.findUnique({
    where: { id },
    include: {
      category: true,
      transactions: {
        orderBy: { date: "asc" },
      },
    },
  });

  if (!item) return null;

  let currentStock = item.balanceForward;
  const transactionsWithBalance = item.transactions.map((tx) => {
    if (tx.type === "RECEIVE") {
      currentStock += tx.quantity;
    } else if (tx.type === "ISSUE") {
      currentStock -= tx.quantity;
    }
    return {
      ...tx,
      balanceAfter: currentStock,
    };
  });

  return {
    ...item,
    unitPrice: item.unitPrice ? Number(item.unitPrice) : null,
    currentStock,
    transactions: transactionsWithBalance,
  };
}

export async function createConsumableItem(data: {
  name: string;
  categoryId: string;
  specification?: string;
  unit: string;
  unitPrice?: number;
  balanceForward: number;
  minStock: number;
  imageUrl?: string;
}) {
  return await prisma.consumableItem.create({
    data: {
      name: data.name,
      categoryId: data.categoryId,
      specification: data.specification,
      unit: data.unit,
      unitPrice: data.unitPrice,
      balanceForward: data.balanceForward,
      minStock: data.minStock,
      imageUrl: data.imageUrl,
    },
  });
}

export async function updateConsumableItem(
  id: string,
  data: {
    name?: string;
    categoryId?: string;
    specification?: string;
    unit?: string;
    unitPrice?: number;
    balanceForward?: number;
    minStock?: number;
  }
) {
  return await prisma.consumableItem.update({
    where: { id },
    data,
  });
}

export async function uploadImageAction(formData: FormData): Promise<string | null> {
  const file = formData.get("file") as File | null;
  if (!file) return null;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const timestamp = Date.now();
  const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;
  const uploadDir = join(process.cwd(), "public", "uploads");
  
  await writeFile(join(uploadDir, filename), buffer);
  return `/uploads/${filename}`;
}

// --- TRANSACTIONS ---
export async function createTransaction(data: {
  itemId: string;
  type: TransactionType;
  date: Date;
  quantity: number;
  sourceOrDestination?: string;
  documentNo?: string;
  notes?: string;
}) {
  return await prisma.consumableTransaction.create({
    data,
  });
}

export async function deleteTransaction(id: string) {
  return await prisma.consumableTransaction.delete({
    where: { id },
  });
}
