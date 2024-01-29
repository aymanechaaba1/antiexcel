import { formatSchool, getAvatarName } from '@/lib/utils';
import React from 'react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { PrismaStudents } from '@/types/prismaTypes';
import Section from './Section';

function StudentsList({ students }: { students: PrismaStudents }) {
  if (students && students.length > 0)
    return (
      <Section title="Students" className="space-y-3 mt-5">
        {students.map((student) => (
          <div
            key={student.id}
            className="flex items-center justify-between gap-4 px-4 py-2 rounded-lg border"
          >
            <Avatar>
              <AvatarFallback>
                {getAvatarName(student.firstname, student.lastname)}
              </AvatarFallback>
            </Avatar>

            <p className="flex-1">
              {student.firstname} {student.lastname}
            </p>
            <p className="flex-1 text-gray-500">Grade {student.grade}</p>
            <p className="flex-1">{formatSchool(student.school)}</p>
          </div>
        ))}
      </Section>
    );
}

export default StudentsList;
