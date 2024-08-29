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
            postStreak : 0,
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

async function update(groupId, data) {
    return await prisma.group.update({
        where: {
            id: groupId,
        },
        data
    });
}

async function like(groupId) {
    return await prisma.group.update({
        where : {
            id : groupId,
        },
        data : {
            likeCount : {
                increment : 1,
            },
        },
    });
}

async function getGroups(offset, limit, orderBy, keyword, isPublic){
    return await prisma.group.findMany({
        where: {
            name: {
                contains: keyword,
            },
            isPublic,
        },
        orderBy,
        skip: offset,
        take: limit,
        
    })
}

async function getGroupsByBadge(offset, limit,keyword,isPublic) {
    return await prisma.$queryRaw`
    SELECT *
    FROM "Group"
    WHERE name ILIKE '%' || ${keyword} || '%'
    AND "isPublic" = ${isPublic}
    ORDER BY COALESCE(ARRAY_LENGTH(badges, 1),0) DESC
    LIMIT ${limit} OFFSET ${offset};
    `;
}

export default{
    findById,
    save,
    remove,
    update,
    like,
    getGroups,
    getGroupsByBadge,
};