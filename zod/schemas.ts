import { dateOptions } from '@/lib/config';
import { formatDate, formatSchool, upperFirst } from '@/lib/utils';
import { z } from 'zod';

export const contactSchema = z.object({
  email: z.string().email(),
  phone: z
    .string()
    .min(10, {
      message: 'Invalid phone',
    })
    .max(14, {
      message: 'Invalid phone',
    }),
  name: z
    .string()
    .min(3, {
      message: 'Invalid name',
    })
    .max(10, {
      message: 'Invalid name',
    })
    .transform((val) => upperFirst(val)),
  relationship: z.enum(['mother', 'father', 'brother', 'sister']),
});

export const studentSchema = z.object({
  firstname: z
    .string({
      invalid_type_error: 'firstname must be a string.',
    })
    .min(2, {
      message: 'firstname must be at least 2 characters.',
    })

    .max(50, {
      message: 'firstname must be 50 characters max.',
    })
    .transform((firstname) => upperFirst(firstname)),
  lastname: z
    .string({
      invalid_type_error: 'lastname must be a string.',
    })
    .min(2, {
      message: 'lastname must be at least 2 characters.',
    })
    .max(50, {
      message: 'lastname must be 50 characters max.',
    })
    .transform((lastname) => upperFirst(lastname)),
  gender: z.enum(['male', 'female']),
  grade: z.enum(['1', '2', '3', '4', '5', '6']).transform((val) => +val),
  birthdate: z.coerce.date(),
  school: z.enum([
    'chkail',
    'henri_matisse',
    'le_bougeoir',
    'diwan',
    'wlad_slama',
    'al_wahda',
  ]),
  teacher: z.string().cuid(),
});

export const teacherSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(10).max(14),
  name: z
    .string()
    .min(3)
    .transform((val) => upperFirst(val)),
  gender: z.enum(['male', 'female']),
  subject: z.enum(['physics', 'maths', 'french']),
});

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
