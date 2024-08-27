import prisma from "../config/prisma.js";

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

export default{
    save, getComments
}