-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Situation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Situation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Called" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "openDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startDate" TIMESTAMP(3),
    "updateDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "userRequestId" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "situationId" INTEGER NOT NULL,

    CONSTRAINT "Called_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commentary" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "calledId" TEXT NOT NULL,

    CONSTRAINT "Commentary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Situation_name_key" ON "Situation"("name");

-- AddForeignKey
ALTER TABLE "Called" ADD CONSTRAINT "Called_userRequestId_fkey" FOREIGN KEY ("userRequestId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Called" ADD CONSTRAINT "Called_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Called" ADD CONSTRAINT "Called_situationId_fkey" FOREIGN KEY ("situationId") REFERENCES "Situation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commentary" ADD CONSTRAINT "Commentary_calledId_fkey" FOREIGN KEY ("calledId") REFERENCES "Called"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
