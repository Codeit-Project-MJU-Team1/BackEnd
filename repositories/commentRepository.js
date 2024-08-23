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

export default{
    save,
}