import { Elysia, t } from 'elysia';

export const RoleModalBase = t.Object({
  name: t.String(),
  createdAt: t.String(),
  updatedAt: t.String(),
  description: t.String(),
  permissions: t.Array(
    t.Object({
      id: t.Numeric(),
      description: t.String(),
      name: t.String(),
    }),
  ),
});

export type RoleTypescriptAnnotation = (typeof RoleModalBase)['static'];

export const RoleModelDTO = new Elysia().model({
  'role.model': RoleModalBase,
});
