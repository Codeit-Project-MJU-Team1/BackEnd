import prisma from "../config/prisma.js";

async function findById(id){
    return await prisma.comment.findUnique({
        where:{
            id,
        }
    });
}

async function save(postId, data) {
    return await prisma.comment.create({
        data: {
            ...data,
            post : {
                connect: {id : postId}
            },
        },
    });
}

async function getComments(offset, limit, postId){
    const result = await prisma.comment.findMany({
        where: {
            postId: postId,
        },
        skip: offset,
        take: limit,
    });
    return result;
}

async function update(commentId, data){
    return await prisma.comment.update({
        where: {
            id : commentId,
        },
        data,
    });
}


export default{
    save, getComments, update, findById
}