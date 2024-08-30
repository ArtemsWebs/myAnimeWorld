import { Elysia, t } from 'elysia';
import { RoleModelSuccessResponse } from '@/server/src/roles/model/role.model';

export const UserModelBase = t.Object({
  name: t.String(),
  email: t.String(),
  image: t.Nullable(t.File()),
  createdAt: t.Date(),
  updatedAt: t.Date(),
  hashedPassword: t.String(),
  roles: t.Array(RoleModelSuccessResponse),
});

export const UserModelCreate = t.Object({
  name: t.String(),
  email: t.String(),
  image: t.Nullable(t.File()),
  hashedPassword: t.String(),
  roles: t.Array(t.Numeric()),
});

export const UserModelUpdate = t.Object({
  name: t.String(),
  email: t.String(),
  image: t.Nullable(t.File()),
  hashedPassword: t.Optional(t.String()),
  roles: t.Array(t.Numeric()),
});

export const UserModelResponse = t.Object({
  id: t.String(),
  name: t.String(),
  email: t.String(),
  image: t.Nullable(t.String()),
  createdAt: t.Date(),
  updatedAt: t.Date(),
  userImage: t.Nullable(
    t.Object({
      id: t.Numeric(),
      bucket: t.String(),
      originalName: t.String(),
      size: t.Number(),
      userId: t.MaybeEmpty(t.String()),
    }),
  ),
  roles: t.Array(
    t.Object({
      name: t.String(),
      permission: t.Array(
        t.Object({
          id: t.Numeric(),
          description: t.String(),
          name: t.String(),
        }),
      ),
      description: t.Nullable(t.String()),
    }),
  ),
});

export type UserTypescriptAnnotation = (typeof UserModelBase)['static'];
export type UserModelBodyCreate = (typeof UserModelCreate)['static'];
export type UserModelBodyUpdate = (typeof UserModelUpdate)['static'];
export type UserModelResponse = (typeof UserModelResponse)['static'];

export const UserModelDTO = new Elysia().model({
  'user.model': UserModelBase,
  'user.model.body.create': UserModelCreate,
  'user.model.body.update': UserModelUpdate,
  'user.me.response': UserModelResponse,
  'user.all.response': t.Array(UserModelResponse),
});
