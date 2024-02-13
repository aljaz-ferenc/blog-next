-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "publishedAt" DATETIME NOT NULL,
    "body" TEXT NOT NULL
);
