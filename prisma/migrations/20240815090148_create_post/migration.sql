-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "nickname" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "tags" TEXT[],
    "location" TEXT NOT NULL,
    "moment" TIMESTAMP(3) NOT NULL,
    "isPublic" BOOLEAN NOT NULL,
    "likeCount" INTEGER NOT NULL,
    "commentCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
