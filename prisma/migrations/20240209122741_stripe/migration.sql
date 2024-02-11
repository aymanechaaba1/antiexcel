/*
  Warnings:

  - You are about to drop the column `avatar` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `subscription_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripe_customer_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripe_subscription_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripe_price_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `relationship` on the `Contact` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gender` on the `Student` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `grade` on the `Student` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `school` on the `Student` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `subject` on the `Teacher` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gender` on the `Teacher` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "School" AS ENUM ('chkail', 'henri_matisse', 'le_bougeoir', 'diwan', 'wlad_slama', 'al_wahda');

-- CreateEnum
CREATE TYPE "Relationship" AS ENUM ('mother', 'father', 'brother', 'sister');

-- CreateEnum
CREATE TYPE "Subject" AS ENUM ('physics', 'maths', 'french');

-- DropIndex
DROP INDEX "User_subscription_id_key";

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "avatar",
DROP COLUMN "relationship",
ADD COLUMN     "relationship" "Relationship" NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "avatar",
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL,
DROP COLUMN "grade",
ADD COLUMN     "grade" INTEGER NOT NULL,
DROP COLUMN "school",
ADD COLUMN     "school" "School" NOT NULL,
ALTER COLUMN "contact_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "avatar",
DROP COLUMN "subject",
ADD COLUMN     "subject" "Subject" NOT NULL,
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "subscription_id",
ADD COLUMN     "stripe_current_period_end" TIMESTAMP(3),
ADD COLUMN     "stripe_customer_id" TEXT,
ADD COLUMN     "stripe_price_id" TEXT,
ADD COLUMN     "stripe_subscription_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_stripe_customer_id_key" ON "User"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripe_subscription_id_key" ON "User"("stripe_subscription_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripe_price_id_key" ON "User"("stripe_price_id");
