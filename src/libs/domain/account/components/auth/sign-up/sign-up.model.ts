import { z } from 'zod';
import { zfd } from 'zod-form-data';

import { passwordZod } from '@/libs/common/utils/string';

export const validateSchema = zfd
  .formData({
    email: zfd.text(z.string().email()),
    password: zfd.text(passwordZod),
    confirmPassword: zfd.text(passwordZod),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
  });
export type SignUpFormModel = z.infer<typeof validateSchema>;
