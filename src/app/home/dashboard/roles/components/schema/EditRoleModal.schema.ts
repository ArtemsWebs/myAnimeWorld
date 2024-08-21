import { z } from 'zod';

export const EditRoleModalSchema = z.object({
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
  permissions: z
    .object({ name: z.string(), description: z.string(), id: z.number() })
    .required()
    .array()
    .nonempty({
      message: 'К роли должна быть привязано хотя бы одно полномочие',
    }),
  isDefaultUser: z.boolean(),
});

export type EditRoleModalSchemaType = z.infer<typeof EditRoleModalSchema>;
