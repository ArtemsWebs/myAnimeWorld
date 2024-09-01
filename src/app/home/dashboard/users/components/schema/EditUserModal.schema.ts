import { z } from 'zod';

export const EditUserModalSchema = z
  .object({
    name: z.string({
      required_error: 'Поля "имя" должно быть обязательно заполнено',
      invalid_type_error: 'Поле "имя" не может содержать численные значения',
    }),
    email: z.string().email({ message: 'Невалидный email адрес' }),
    password: z.string().default(''),
    confirm: z.string().default(''),
    accessChangePassword: z.boolean().optional().default(false),
    roles: z
      .array(
        z.object({
          id: z.number(),
          name: z.string(),
          description: z.string().nullable(),
          permission: z.array(
            z.object({
              name: z.string(),
              description: z.string().nullable(),
              id: z.number(),
            }),
          ),
        }),
      )
      .refine(
        (v) => {
          return v.length !== 0;
        },
        {
          message: 'У пользователя должна быть выбрана хотя бы одна роль',
          path: ['roles'],
        },
      ),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Пароли не совпадают',
    path: ['confirm'], // path of error
  })
  .refine(
    (data) => {
      if (data.accessChangePassword) {
        return data.password.length >= 4;
      }
      return true;
    },
    {
      message: 'Пароль должен содержать больше 4 символов',
      path: ['password'],
    },
  );

export type EditUserModalType = z.infer<typeof EditUserModalSchema>;
