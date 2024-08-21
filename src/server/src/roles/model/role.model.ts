import { Elysia, t } from 'elysia';

export const RoleModelBase = t.Object({
  name: t.String(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
  description: t.String(),
  isDefaultUser: t.Boolean(),
  permission: t.Array(
    t.Object({
      id: t.Numeric(),
      description: t.String(),
      name: t.String(),
    }),
  ),
});

const RoleModelSuccessResponse = t.Object({
  id: t.Numeric(),
  name: t.String(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
  description: t.Nullable(t.String()),
  isDefaultUser: t.Boolean(),
  permission: t.Array(
    t.Object({
      id: t.Numeric(),
      description: t.String(),
      name: t.String(),
    }),
  ),
});

const RoleAllModelResponse = t.Array(RoleModelSuccessResponse);

export type RoleBody = (typeof RoleModelBase)['static'];

export type RoleModelResponse = (typeof RoleModelSuccessResponse)['static'];

export const RoleModelDTO = new Elysia().model({
  'role.model': RoleModelBase,
  'roleAll.model.response': RoleAllModelResponse,
  'roleUpdate.model.response': RoleModelSuccessResponse,
});
