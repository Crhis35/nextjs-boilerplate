import { z } from 'zod';

export const validateSchema = z.object({
  id: z.string(),
  name: z.string(),
  lastName: z.string(),
  cityId: z.string(),
});

export type MeFormModel = z.infer<typeof validateSchema>;
