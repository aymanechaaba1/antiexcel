import { z } from 'zod';

export const schoolsEnum = z.enum(
  ['chkail', 'henri_matisse', 'le_bougeoir', 'diwan', 'wlad_slama', 'al_wahda'],
  {
    invalid_type_error: 'school must be within the provided values.',
  }
);
export type SchoolsEnum = z.infer<typeof schoolsEnum>;

export const formSchema = z.object({
  id: z.string().cuid().optional(),
  firstname: z
    .string({
      invalid_type_error: 'firstname must be a string.',
    })
    .min(2, {
      message: 'firstname must be at least 2 characters.',
    })
    .max(50, {
      message: 'firstname must be 50 characters max.',
    }),
  lastname: z
    .string({
      invalid_type_error: 'lastname must be a string.',
    })
    .min(2, {
      message: 'lastname must be at least 2 characters.',
    })
    .max(50, {
      message: 'lastname must be 50 characters max.',
    }),
  birthdate: z.date(),
  gender: z.enum(['male', 'female'], {
    invalid_type_error: 'gender must be either male or female.',
  }),
  grade: z.string().max(1, {
    message: 'grade must be a number between 1 and 6.',
  }),
  school: schoolsEnum,
  avatar: z.instanceof(File),
});
export type FormSchema = z.infer<typeof formSchema>;

export const studentSchema = z.object({
  id: z.string().cuid(),
  created_at: z.date().nullable(),
  updated_at: z.date().nullable(),
  firstname: z
    .string({
      invalid_type_error: 'firstname must be a string.',
    })
    .min(2, {
      message: 'firstname must be at least 2 characters.',
    })
    .max(50, {
      message: 'firstname must be 50 characters max.',
    }),
  lastname: z
    .string({
      invalid_type_error: 'lastname must be a string.',
    })
    .min(2, {
      message: 'lastname must be at least 2 characters.',
    })
    .max(50, {
      message: 'lastname must be 50 characters max.',
    }),
  gender: z.string(),
  grade: z.string().max(1, {
    message: 'grade must be a number between 1 and 6.',
  }),
  birthdate: z.date(),
  school: z.string(),
  avatar: z.string({
    invalid_type_error: 'avatar/picture must be a string.',
  }),
  user_id: z.string().cuid(),
});
export type Student = z.infer<typeof studentSchema>;

export const contactFormSchema = z.object({
  id: z.string().cuid().optional(),
  created_at: z.date().nullable(),
  updated_at: z.date().nullable(),
  email: z.string().email(),
  phone: z.string().min(10).max(14),
  name: z.string().min(3).max(10),
  relationship: z.string(),
  avatar: z.instanceof(File).optional(),
  student_id: z.string().cuid(),
});

export const contactSchema = z.object({
  id: z.string().cuid().optional(),
  created_at: z.date().nullable(),
  updated_at: z.date().nullable(),
  email: z.string().email(),
  phone: z.string().min(10).max(14),
  name: z.string().min(3).max(10),
  relationship: z.string(),
  avatar: z.string(),
  student_id: z.string().cuid(),
});
export type Contact = z.infer<typeof contactSchema>;

export const teacherFormSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(10).max(14),
  name: z.string().min(3),
  avatar: z.instanceof(File).optional(),
  subject: z.string().min(3),
});

export const teacherSchema = z.object({
  id: z.string().cuid().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  email: z.string().email(),
  phone: z.string().min(10).max(14).optional(),
  name: z.string().min(3),
  avatar: z.string().optional(),
  subject: z.string(),
  user_id: z.string().cuid(),
});
export type Teacher = z.infer<typeof teacherSchema>;
