import { StudentsFilterOption } from '@/app/students/page';

export const LOGO_URL =
  'https://firebasestorage.googleapis.com/v0/b/school-manager-e26b7.appspot.com/o/Screenshot%202023-12-09%20at%204.33.43%20PM.png?alt=media&token=ced15002-f3f9-47c1-a77a-cb0e203dccb6';
export const VIDEO_URL =
  'https://firebasestorage.googleapis.com/v0/b/school-manager-e26b7.appspot.com/o/edited-demo-antiexcel.mp4?alt=media&token=dfa44346-9bf5-4123-9072-f9cdda2a50a4';

export const dateOptions: Intl.DateTimeFormatOptions | undefined = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
};

export const DEFAULT_PAGE = 1;
export const DEFAULT_PER_PAGE = 5;
export const DEFAULT_SORT_BY: 'latest' | 'oldest' = 'latest';

export const DEFAULT_FILTER_STUDENTS_BY: StudentsFilterOption = 'grade';
export const DEFAULT_FILTER_STUDENTS_GRADE = '';

export const FREE_PLAN_LIMIT: number = 3;
