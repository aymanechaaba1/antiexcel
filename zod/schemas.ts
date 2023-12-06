import { z } from 'zod';

export const schoolsEnum = z.enum(
  ['chkail', 'henri_matisse', 'le_bougeoir', 'diwan', 'wlad_slama', 'al_wahda'],
  {
    invalid_type_error: 'school must be within the provided values.',
  }
);
export type SchoolsEnum = z.infer<typeof schoolsEnum>;

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

export const formSchema = z.object({
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
  gender: z.string().min(4).max(6),
  grade: z.string().max(1, {
    message: 'grade must be a number between 1 and 6.',
  }),
  school: z.string().min(3),
  teacher_id: z.string().cuid(),
  avatar: z.instanceof(File),
  contact_email: z.string().email(),
  contact_phone: z.string().min(10).max(14),
  contact_name: z.string().min(3).max(10),
  contact_relationship: z.string(),
  contact_avatar: z.instanceof(File).optional(),
});
export type FormSchema = z.infer<typeof formSchema>;

export const contactSchema = z.object({
  id: z.string().cuid().optional(),
  created_at: z.date().nullable().optional(),
  updated_at: z.date().nullable().optional(),
  email: z.string().email(),
  phone: z.string().min(10).max(14),
  name: z.string().min(3).max(10),
  relationship: z.string(),
  avatar: z.string(),
  student_id: z.string().cuid().optional(),
});
export type Contact = z.infer<typeof contactSchema>;

export const studentSchema = z.object({
  id: z.string().cuid().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
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
  birthdate: z.string(),
  school: z.string(),
  avatar: z.string({
    invalid_type_error: 'avatar/picture must be a string.',
  }),
  user_id: z.string().cuid(),
  teacher_id: z.string().cuid(),
  contact: contactSchema,
});
export type Student = z.infer<typeof studentSchema>;

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

export const PaypalRequestBody = z.object({
  id: z.string().min(6).max(50).startsWith('PROD-').optional(),
  name: z.string().min(1).max(127),
  description: z.string().min(1).max(256).optional(),
  type: z.string().min(1).max(24).default('PHYSICAL'),
  category: z.string().min(4).max(256).optional(),
  image_url: z.string().min(1).max(2000).optional(),
  home_url: z.string().min(1).max(2000).optional(),
});

export const PaypalSubscriptionRequestBodySchema = z.object({
  product_id: z.string().min(6).max(50),
  name: z.string().min(1).max(127),
  billing_cycles: z
    .array(
      z.object({
        frequency: z.object({
          interval_unit: z.string().default('MONTH'),
          interval_count: z.number().default(1),
        }),
        tenure_type: z.string().default('TRIAL'),
        sequence: z.number().default(1),
        total_cycles: z.number().default(2),
        pricing_scheme: z.object({
          fixed_price: z.object({
            value: z.string(),
            currency_code: z.string().default('USD'),
          }),
        }),
      })
    )
    .min(1)
    .max(12),
  payment_preferences: z.object({
    auto_bill_outstanding: z.boolean().default(true),
    setup_fee: z.object({
      value: z.string().default('10'),
      currency_code: z.string().default('USD'),
    }),
    setup_fee_failure_action: z.string().default('CONTINUE'),
    payment_failure_threshold: z.number().default(3),
  }),
  taxes: z.object({
    percentage: z.string().default('10'),
    inclusive: z.boolean().default(false),
  }),
});
