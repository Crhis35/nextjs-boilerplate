import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { passwordZod } from '@/libs/common/utils/string'

export const validateSchema = zfd.formData({
	email: zfd.text(z.string().email()),
	password: zfd.text(passwordZod),
})
export type LoginFormModel = z.infer<typeof validateSchema>
