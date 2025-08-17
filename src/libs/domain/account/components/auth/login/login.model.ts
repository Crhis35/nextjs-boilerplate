import { z } from 'zod';

import { passwordZod } from '@/libs/utils/string';

export const validateSchema = z.object({
  email: z.email(),
  password: passwordZod,
});
export type LoginFormModel = z.infer<typeof validateSchema>;
