import prisma from '../config/prisma.js';

async function findById(id) {
    return await prisma.post.findUnique({
        where: {
            id,
        },
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

async function update(postId, data){
    return await prisma.post.update({
        where: {
            id : postId,
        },
        data,
    });
};

async function remove(postId) {
    return await prisma.post.delete({
        where : {
            id : postId,
        },  
    });
};

async function like(postId) {
    return await prisma.post.update({
        where: {
            id : postId,
        },
        data : {
            likeCount: {
                increment : 1,
            },
        },
    });   
}

async function getPosts(offset, limit, orderBy, keyword, isPublic, groupId){
    const result = await prisma.post.findMany({
        where: {
            groupId: groupId,
            title: {
                contains: keyword,
            },
            isPublic,
        },
        orderBy,
        skip: offset,
        take: limit,
    });
    return result;
}



export default {
    save, findById,
    update, remove,
    like, getPosts,
};