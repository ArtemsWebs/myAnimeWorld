import { Elysia, t } from 'elysia';

export const PermissionModalBase = t.Object({
  description: t.String(),
  name: t.String(),
  updatedAt: t.String(),
  createdAt: t.String(),
});

export type PermissionTypescriptAnnotation =
  (typeof PermissionModalBase)['static'];

export const PermissionModelDTO = new Elysia().model({
  'permission.model': PermissionModalBase,
});
