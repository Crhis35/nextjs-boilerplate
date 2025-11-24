import { z } from 'zod';
// import { passwordZod } from '@/libs/utils/string';

export const loginValidateSchema = z.object({
  email: z.email(),
  //   password: passwordZod,
  password: z.string(),
});

export type LoginFormModel = z.infer<typeof loginValidateSchema>;
