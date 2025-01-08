/*
  Warnings:

  - A unique constraint covering the columns `[imdbID]` on the table `movies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imdbID` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movies" ADD COLUMN     "imdbID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "movies_imdbID_key" ON "movies"("imdbID");
