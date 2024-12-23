-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "auth_id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'no name',
    "email" TEXT NOT NULL,
    "type" TEXT,
    "insta" TEXT,
    "x" TEXT,
    "tiktok" TEXT,
    "hp" TEXT,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "catch" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "authorId" INTEGER,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Apply" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "stageType" TEXT,
    "roomType" TEXT,
    "storeType" TEXT,
    "time" INTEGER,
    "collaboration" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,
    "priority" BOOLEAN NOT NULL,
    "newProject" BOOLEAN NOT NULL,

    CONSTRAINT "Apply_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Group_auth_id_key" ON "Group"("auth_id");

-- CreateIndex
CREATE UNIQUE INDEX "Group_email_key" ON "Group"("email");

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apply" ADD CONSTRAINT "Apply_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
