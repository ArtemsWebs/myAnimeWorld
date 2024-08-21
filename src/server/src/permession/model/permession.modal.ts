import { Elysia, t } from 'elysia';

export const PermissionModelBase = t.Object({
  description: t.String(),
  name: t.String(),
  updatedAt: t.Date(),
  createdAt: t.Date(),
});

export const PermissionAllModelResponse = t.Array(
  t.Object({
    id: t.Numeric(),
    description: t.String(),
    name: t.String(),
    updatedAt: t.Date(),
    createdAt: t.Date(),
  }),
);

export const PermissionUpdateModelResponse = t.Object({
  id: t.Numeric(),
  description: t.String(),
  name: t.String(),
  updatedAt: t.Date(),
  createdAt: t.Date(),
});

export type PermissionBodyBase = (typeof PermissionModelBase)['static'];

export type PermissionAllResponse =
  (typeof PermissionAllModelResponse)['static'];

export type PermissionResponse =
  (typeof PermissionUpdateModelResponse)['static'];

export const PermissionModelDTO = new Elysia().model({
  'permission.model': PermissionModelBase,
  'permissionAll.model.response': PermissionAllModelResponse,
  'permission.model.response': PermissionUpdateModelResponse,
});
