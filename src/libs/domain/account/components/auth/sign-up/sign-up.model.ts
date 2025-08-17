import { z } from 'zod';

import { passwordZod } from '@/libs/utils/string';

export const validateSchema = z
  .object({
    email: z.email(),
    password: passwordZod,
    confirmPassword: passwordZod,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
  });
export type SignUpFormModel = z.infer<typeof validateSchema>;
