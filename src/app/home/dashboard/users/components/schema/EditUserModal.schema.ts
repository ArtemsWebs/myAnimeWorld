import { z } from 'zod';

export const EditUserModalSchema = z.object({
  name: z.string({
    required_error: 'Поля "имя" должно быть обязательно заполнено',
    invalid_type_error: 'Поле "имя" не может содержать численные значения',
  }),
  email: z.string().email({ message: 'Невалидный email адрес' }),
});
