import { type ClassValue, clsx } from 'clsx';
import {
  StorageError,
  UploadTaskSnapshot,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
import { twMerge } from 'tailwind-merge';
import { ref } from 'firebase/storage';
import { storage } from './firebase';
import { serverClient } from '@/app/_trpc/serverClient';
import { PayPalAccessTokenResponse } from '@/types/paypal-accesstoken-response';
import { formSchema } from '@/zod/schemas';
import { z } from 'zod';
import { Dispatch, SetStateAction } from 'react';

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

export const getUploadTask = (refUrl: string, file: File | Blob) =>
  uploadBytesResumable(ref(storage, refUrl), file);

export const uploadFile = (
  refUrl: string,
  file: File | Blob,
  onSnapshot: (snapshot: UploadTaskSnapshot) => void,
  onError: (error: StorageError) => void,
  onSuccess: () => void
) => {
  const uploadTask = getUploadTask(refUrl, file);
  uploadTask.on('state_changed', onSnapshot, onError, onSuccess);
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

export const getNbStudentsByMonth = (
  data:
    | Awaited<ReturnType<(typeof serverClient)['getStudents']>>
    | Awaited<ReturnType<(typeof serverClient)['getTeachers']>>,
  month: number
) => {
  return data.filter((entry) => entry.created_at?.getMonth() === month).length;
};

export const getSubjectProportion = (
  teachers: Awaited<ReturnType<(typeof serverClient)['getTeachers']>>,
  subject: string
) => {
  return (
    teachers.filter((teacher) => teacher.subject === subject).length /
    teachers.length
  );
};

export const fetchNewAccessToken = async () => {
  const res = await fetch(`https://api-m.sandbox.paypal.com/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET}`
      ).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) throw new Error(`Invalid response format!`);

  const data: PayPalAccessTokenResponse = await res.json();

  return data;
};

export const uploadContactAvatar = (
  values: z.infer<typeof formSchema>,
  setProgress: Dispatch<SetStateAction<number>>,
  setContactAvatar: Dispatch<SetStateAction<string>>,
  fn: () => void
) => {};

export const hideId = (id: string) => id.slice(0, 4).padEnd(id.length, '*');

// upload contact
// uploadContactAvatar(values, setProgress, setContactAvatar, () => {
//   console.log(studentAvatar);
//   console.log(contactAvatar);

//   if (studentAvatar && contactAvatar) {
//     addStudent.mutate({
//       ...values,
//       birthdate: values.birthdate.toISOString(),
//       avatar: studentAvatar,
//       contact: {
//         email: values.contact_email,
//         phone: values.contact_phone,
//         name: values.contact_name,
//         relationship: values.contact_relationship,
//         avatar: contactAvatar,
//       },
//     });
//     // setOpen(false);
//   }
// });
