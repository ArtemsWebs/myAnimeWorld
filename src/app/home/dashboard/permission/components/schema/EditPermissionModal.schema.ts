import { z } from 'zod';

export const EditPermissionModalSchema = z.object({
  name: z
    .string({
      required_error: 'Поля "имя" должно быть обязательно заполнено',
      invalid_type_error: 'Поле "имя" не может содержать численные значения',
    })
    .min(5, 'Поля "имя" должно содержать более 5 символов'),
  description: z.string({
    required_error: 'Поля "имя" должно быть обязательно заполнено',
    invalid_type_error: 'Поле "имя" не может содержать численные значения',
  }),
});
