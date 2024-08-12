import { z } from 'zod';

export const EditUserModalSchema = z
  .object({
    name: z.string({
      required_error: 'Поля "имя" должно быть обязательно заполнено',
      invalid_type_error: 'Поле "имя" не может содержать численные значения',
    }),
    email: z.string().email({ message: 'Невалидный email адрес' }),
    password: z
      .string()
      .min(4, { message: 'Пароль должен содержать более 4 символов' })
      .default(''),
    confirm: z
      .string()
      .min(4, { message: 'Пароль должен содержать более 4 символов' })
      .default(''),
    roles: z
      .object({ name: z.string(), description: z.string(), id: z.number() })
      .array()
      .nonempty({
        message: 'К пользователю должна быть привязано хотя бы одна роль',
      }),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Пароли не совпадают',
    path: ['confirm'], // path of error
  });

export type EditUserModalType = z.infer<typeof EditUserModalSchema>;
