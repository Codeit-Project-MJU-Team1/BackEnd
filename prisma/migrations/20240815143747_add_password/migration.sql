/*
  Warnings:

  - Added the required column `password` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "password" TEXT NOT NULL;
