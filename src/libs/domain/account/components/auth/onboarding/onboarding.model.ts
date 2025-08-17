import { z } from 'zod';

export const validateSchema = z.object({
  name: z.string(),
  lastName: z.string(),
  cityId: z.string(),
});

export type OnboardingFormModel = z.infer<typeof validateSchema>;
