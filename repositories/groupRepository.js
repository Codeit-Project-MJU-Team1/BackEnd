import prisma from '../config/prisma.js';

async function findByName(id){
    return await prisma.group.findUnique({
        where:{
            id,
        }
    });
}

async function save(group) {
    return await prisma.group.create({
      data: {
        //id : autoIncrement
        name: group.name,
        password : group.password,
        imageUrl : group.imageUrl,
        isPublic : group.isPublic,
        likeCount : 0,
        badges : [],
        postCount : 0,
        introduction : group.introduction,
      },
    });
}

export default{
    findByName,
    save,
};