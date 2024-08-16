import prisma from '../config/prisma.js';

async function findById(id) {
    return await prisma.post.findUnique({
        where: {
            id,
        }
    });
}

async function save(groupId, data) {
    return await prisma.post.create({
        data: {
            ...data,
            likeCount: 0,
            commentCount: 0,
            group : {
                connect: {id : groupId}
            },
        },
    });
}

export default {
    save, findById,
};