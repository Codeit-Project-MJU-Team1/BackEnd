import prisma from '../config/prisma.js';

// async function findById(id) {
//     return await prisma.group.findUnique({
//         where: {
//             id,
//         }
//     });
// }

async function save(post, groupId) {
    return await prisma.post.create({
        data: {
            ...post,
            likeCount: 0,
            commentCount: 0,
            group : {
                connect: {id : groupId}
            },
        },
    });
}

export default {
    save,
};