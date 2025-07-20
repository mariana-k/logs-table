-- CreateTable
CREATE TABLE "Log" (
    "id" SERIAL NOT NULL,
    "owner" TEXT NOT NULL,
    "logText" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);
