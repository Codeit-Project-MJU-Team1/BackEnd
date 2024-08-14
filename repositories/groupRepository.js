import prisma from '../config/prisma.js';

async function findById(id){
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

async function remove(groupId) {
    return await prisma.group.delete({
        where: {
            id: groupId,
        },
    });
}

export default{
    findById,
    save,
    remove,
};