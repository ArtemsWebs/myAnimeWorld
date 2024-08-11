import { Elysia, t } from 'elysia';

export const UserModalBase = t.Object({
  name: t.String(),
  email: t.String(),
  image: t.File(),
});

export type UserTypescriptAnnotation = (typeof UserModalBase)['static'];

export const UserModelDTO = new Elysia().model({
  'user.model': UserModalBase,
});
