import prisma from '../config/prisma.js';

async function findById(id) {
    return await prisma.post.findUnique({
        where: {
            id,
        },
    });
}

async function findByDate(groupId, start, end){
    return await prisma.post.findFirst({
        where: {
            groupId,
            createdAt: {
                gte: start,
                lt : end,
            },
        },
    });
}

async function save(groupId, data) {
    return await prisma.post.create({
        data: {
            ...data,
            likeCount: 9990,
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

async function getPostsLikeBadge(postId, badgeName) {
    return await prisma.post.update({
        where: {
            id: postId,
        },
        data: {
            badge: {
                push: badgeName, // badges 배열에 배지 추가
            },
        },
    });
}



export default {
    save, findById,
    findByDate, update,
    remove, like,
    getPosts, getPostsLikeBadge
};