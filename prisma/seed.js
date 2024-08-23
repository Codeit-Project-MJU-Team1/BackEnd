import { PrismaClient } from "@prisma/client";
import { GROUPS, POSTS } from "./mock.js";

const prisma = new PrismaClient();

async function seeding() {
    //기존 데이터 삭제
    await prisma.group.deleteMany();
    await prisma.post.deleteMany();
    
    //새로운 데이터 삽입
    await prisma.group.createMany({
        data: GROUPS,
        skipDuplicates: true,
    });

    const groups = await prisma.group.findMany();

    for(const group of groups){
      for(const post of POSTS){
        const {nickname, title, content, postPassword, imageUrl, tags, location, moment, isPublic,
        likeCount, commentCount
      } = post; 
        await prisma.post.create({
          data : {
            nickname,
            title,
            content,
            password : postPassword,
            imageUrl,
            tags,
            location,
            moment,
            isPublic,
            likeCount,
            commentCount,
            group: {
              connect : {
                id : group.id,
              },
            },
          },
        });
      }
    }

    
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