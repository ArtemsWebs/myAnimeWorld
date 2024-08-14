import { Elysia, t } from 'elysia';
import { RoleModalBase } from '../../roles/model/role.model';

export const UserModelBase = t.Object({
  name: t.String(),
  email: t.String(),
  image: t.String(),
  createdAt: t.Date(),
  roles: t.Array(RoleModalBase),
});

//roles: { select: { permission: true, name: true, description: true } },

export const UserModelRespones = t.Object({
  name: t.String(),
  email: t.String(),
  image: t.Nullable(t.String()),
  createdAt: t.Date(),
  userImage: t.Nullable(
    t.Object({
      id: t.Numeric(),
      bucket: t.String(),
      originalName: t.String(),
      size: t.Number(),
      userId: t.Optional(t.String()),
    }),
  ),
  roles: t.Array(
    t.Object({
      name: t.String(),
      permission: t.Array(
        t.Object({
          id: t.Numeric(),
          description: t.Nullable(t.String()),
          name: t.String(),
        }),
      ),
      description: t.Nullable(t.String()),
    }),
  ),
  id: t.String(),
});

export type UserTypescriptAnnotation = (typeof UserModelBase)['static'];

export const UserModelDTO = new Elysia().model({
  'user.model': UserModelBase,
  'user.me.response': UserModelRespones,
  'user.all.response': t.Array(UserModelRespones),
});
