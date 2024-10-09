import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const validateSchema = zfd.formData({
  name: zfd.text(z.string()),
  lastName: zfd.text(z.string()),
  cityId: zfd.text(z.string()),
});

export type OnboardingFormModel = z.infer<typeof validateSchema>;
