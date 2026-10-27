import { PrismaClient, Role, ItemStatus, UrgencyLevel, RequisitionStatus, TransactionType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding municipal inventory database (Phase 1)...");

  // 1. Create Users with 3 Roles: ADMIN, EXECUTIVE, USER
  const admin = await prisma.user.upsert({
    where: { email: "admin@munic.local" },
    update: {},
    create: {
      email: "admin@munic.local",
      name: "อนุชา ดวงดี (เจ้าหน้าที่พัสดุ)",
      password: "hashed_password_demo",
      role: Role.ADMIN,
      department: "กองคลัง - งานพัสดุ",
      position: "นักวิชาการพัสดุปฏิบัติการ",
      phone: "081-234-5678",
    },
  });

  const executive = await prisma.user.upsert({
    where: { email: "exec@munic.local" },
    update: {},
    create: {
      email: "exec@munic.local",
      name: "ดร.ไพศาล เกียรติภูมิ (ปลัดเทศบาล)",
      password: "hashed_password_demo",
      role: Role.EXECUTIVE,
      department: "สำนักปลัดเทศบาล",
      position: "ปลัดเทศบาล",
      phone: "089-876-5432",
    },
  });

  const user = await prisma.user.upsert({
    where: { email: "user@munic.local" },
    update: {},
    create: {
      email: "user@munic.local",
      name: "สมชาย รักษาการ (เจ้าหน้าที่ธุรการ)",
      password: "hashed_password_demo",
      role: Role.USER,
      department: "กองช่าง",
      position: "เจ้าพนักงานธุรการชำนาญงาน",
      phone: "082-345-6789",
    },
  });

  // 2. Create Categories
  const catOffice = await prisma.category.upsert({
    where: { name: "วัสดุสำนักงาน" },
    update: {},
    create: {
      code: "CAT-OFF",
      name: "วัสดุสำนักงาน",
      description: "กระดาษ แฟ้ม ปากกา และอุปกรณ์เครื่องเขียน",
    },
  });

  const catCom = await prisma.category.upsert({
    where: { name: "วัสดุคอมพิวเตอร์" },
    update: {},
    create: {
      code: "CAT-COM",
      name: "วัสดุคอมพิวเตอร์",
      description: "ตลับหมึก แฟลชไดรฟ์ สายเชื่อมต่อ และอุปกรณ์เสริม",
    },
  });

  // 3. Create Sample Items with Images
  const itemPaper = await prisma.item.upsert({
    where: { code: "MAT-OFF-001" },
    update: {},
    create: {
      code: "MAT-OFF-001",
      name: "กระดาษถ่ายเอกสาร A4 (80 แกรม) Double A",
      description: "กระดาษพิมพ์เอกสารคุณภาพสูง ขนาด A4 บรรจุ 500 แผ่น/รีม",
      unit: "รีม",
      quantity: 50,
      minQuantity: 15,
      price: 135.00,
      location: "คลังกลาง ชั้น 1 ล็อก A-01",
      status: ItemStatus.AVAILABLE,
      categoryId: catOffice.id,
      imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&auto=format",
    },
  });

  const itemToner = await prisma.item.upsert({
    where: { code: "MAT-COM-001" },
    update: {},
    create: {
      code: "MAT-COM-001",
      name: "ตลับหมึกเลเซอร์ HP 85A (CE285A) สีดำ",
      description: "ตลับหมึกแท้สำหรับเครื่องพิมพ์ HP LaserJet P1102 / M1132 / M1212",
      unit: "ตลับ",
      quantity: 3,
      minQuantity: 5,
      price: 2450.00,
      location: "คลังกลาง ชั้น 2 ตู้ B-03",
      status: ItemStatus.LOW_STOCK,
      categoryId: catCom.id,
      imageUrl: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&auto=format",
    },
  });

  console.log("Database seeded successfully with Users, Categories, and Items!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
