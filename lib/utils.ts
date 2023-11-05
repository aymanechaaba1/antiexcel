import { type ClassValue, clsx } from 'clsx';
import { uploadBytesResumable } from 'firebase/storage';
import { twMerge } from 'tailwind-merge';
import { ref } from 'firebase/storage';
import { storage } from './firebase';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { serverClient } from '@/app/_trpc/serverClient';
import { Student } from '@/zod/schemas';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getAvatarName = (...names: string[]) =>
  names.map((word) => word[0].toUpperCase()).join('');

export const formatDate = (
  date: Date | number,
  locales: string,
  options?: Intl.DateTimeFormatOptions
) => new Intl.DateTimeFormat(locales, options).format(date);

export const upperFirst = (word: string) =>
  word[0].toUpperCase().concat(word.slice(1));

export const formatUnderscore = (word: string) =>
  word
    .split('_')
    .map((word) => word[0].toUpperCase().concat(word.slice(1)))
    .join(' ');

// "C:\fakepath\239079.png"
export const getFilename = (fileUrl: string) =>
  fileUrl.split('\\').slice(-1).join('');

export const uploadFile = (refUrl: string, file: File | Blob) => {
  const uploadTask = uploadBytesResumable(ref(storage, refUrl), file);
  return uploadTask;
};

export const getBase64 = (file: File | Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const formatSchool = (school: string) =>
  school
    .toLowerCase()
    .split('_')
    .map((word) => upperFirst(word))
    .join(' ');

export const fetchStudents = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return;

  const students = await serverClient.getStudents({
    user_id: session.user.id,
  });

  return students;
};

export const getStudentsByYear = (students: Student[], year: number) =>
  students.filter(
    (student) => new Date(student.created_at!).getFullYear() === year
  );

export const getStudentsByMonth = (students: Student[], month: number) =>
  students.filter(
    (student) => new Date(student.created_at!).getMonth() === month
  );

export const generateChartData = (students: Student[], year: number) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return months.map((month) => {
    return {
      month,
      students: getStudentsByYear(
        getStudentsByMonth(students, months.indexOf(month)),
        year
      ).length,
    };
  });
};
