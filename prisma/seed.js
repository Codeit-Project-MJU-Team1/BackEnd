import { PrismaClient } from "@prisma/client";
import { GROUPS } from "./mock.js";

const prisma = new PrismaClient();

async function seeding() {
    //기존 데이터 삭제
    await prisma.group.deleteMany();
    
    //새로운 데이터 삽입
    await prisma.group.createMany({
        data: GROUPS,
        skipDuplicates: true,
    });
}

seeding()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });