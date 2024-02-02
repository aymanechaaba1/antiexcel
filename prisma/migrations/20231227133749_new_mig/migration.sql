-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_contact_id_fkey";

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;
