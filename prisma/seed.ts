import { PrismaClient, TransactionType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Consumables Inventory database...");

  // 1. Create OrganizationInfo
  await prisma.organizationInfo.create({
    data: {
      officeName: "เทศบาลตำบลตัวอย่าง",
      department: "กองคลัง",
      district: "เมือง",
      province: "กรุงเทพมหานคร",
      fiscalYear: "2567",
      coordinator: "สมชาย รักษาการ (เจ้าหน้าที่พัสดุ)",
    },
  });

  // 2. Create Categories
  const catOffice = await prisma.category.upsert({
    where: { name: "วัสดุสำนักงาน" },
    update: {},
    create: { name: "วัสดุสำนักงาน" },
  });

  const catElectric = await prisma.category.upsert({
    where: { name: "วัสดุไฟฟ้าและวิทยุ" },
    update: {},
    create: { name: "วัสดุไฟฟ้าและวิทยุ" },
  });

  const catHouse = await prisma.category.upsert({
    where: { name: "วัสดุงานบ้านงานครัว" },
    update: {},
    create: { name: "วัสดุงานบ้านงานครัว" },
  });

    const unitReam = await prisma.unit.upsert({where:{name:"รีม"},update:{},create:{name:"รีม"}}); const unitPiece = await prisma.unit.upsert({where:{name:"ด้าม"},update:{},create:{name:"ด้าม"}}); const unitBulb = await prisma.unit.upsert({where:{name:"หลอด"},update:{},create:{name:"หลอด"}}); // 3. Create Consumable Items
  const itemPaper = await prisma.consumableItem.create({
    data: {
      categoryId: catOffice.id,
      name: "กระดาษถ่ายเอกสาร A4 (80 แกรม)",
      specification: "Double A บรรจุ 500 แผ่น",
      unitId: unitReam.id,
      unitPrice: 135.00,
      balanceForward: 50,
    },
  });

  const itemPen = await prisma.consumableItem.create({
    data: {
      categoryId: catOffice.id,
      name: "ปากกาลูกลื่น 0.5 มม.",
      specification: "สีน้ำเงิน",
      unitId: unitPiece.id,
      unitPrice: 5.50,
      balanceForward: 100,
    },
  });

  const itemBulb = await prisma.consumableItem.create({
    data: {
      categoryId: catElectric.id,
      name: "หลอดไฟ LED 18W",
      specification: "แสงขาง (Daylight)",
      unitId: unitBulb.id,
      unitPrice: 95.00,
      balanceForward: 20,
    },
  });

  // 4. Create Transactions
  await prisma.consumableTransaction.create({
    data: {
      itemId: itemPaper.id,
      type: TransactionType.RECEIVE,
      date: new Date("2024-10-01T09:00:00Z"),
      quantity: 50,
      sourceOrDestination: "ร้านเครื่องเขียนพัฒนา",
      documentNo: "PO-2567-001",
      notes: "จัดซื้อประจำเดือนตุลาคม",
    },
  });

  await prisma.consumableTransaction.create({
    data: {
      itemId: itemPaper.id,
      type: TransactionType.ISSUE,
      date: new Date("2024-10-05T10:30:00Z"),
      quantity: 10,
      sourceOrDestination: "สำนักปลัด (นาย ก.)",
      documentNo: "REQ-2567-001",
      notes: "ใช้งานทั่วไป",
    },
  });

  await prisma.consumableTransaction.create({
    data: {
      itemId: itemBulb.id,
      type: TransactionType.ISSUE,
      date: new Date("2024-10-10T14:15:00Z"),
      quantity: 5,
      sourceOrDestination: "กองช่าง (นาย ข.)",
      documentNo: "REQ-2567-002",
      notes: "ซ่อมแซมอาคารศูนย์เด็กเล็ก",
    },
  });

  console.log("Database seeded successfully with Organization, Categories, Items, and Transactions!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
