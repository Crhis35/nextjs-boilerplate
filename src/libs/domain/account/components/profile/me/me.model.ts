import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const validateSchema = zfd.formData({
  id: zfd.text(z.string()),
  name: zfd.text(z.string()),
  lastName: zfd.text(z.string()),
  cityId: zfd.text(z.string()),
});

export type MeFormModel = z.infer<typeof validateSchema>;
