export type Permission = {
  description: string;
  name: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
};
export type Role = {
  id: number;
  description: string;
  name: string;
  isDefaultUser: boolean;
  permission: Permission[];
  updatedAt: Date;
  createdAt: Date;
};
