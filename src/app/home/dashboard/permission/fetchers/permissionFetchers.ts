import { fetcherClient } from '@/app/lib/apiFetcher/apiFetcher';
import { PermissionBodyBase } from '@/server/src/permession/model/permession.modal';

export const getAllPermissions = async () => {
  return await fetcherClient.api.v1.permission.allPermissions.get();
};

export const updatePermission = async (
  permissionData: PermissionBodyBase,
  permissionId: number,
) => {
  return await fetcherClient.api.v1.permission
    .changePermission({ permissionId })
    .put(permissionData);
};

export const createPermission = async (permissionData: PermissionBodyBase) => {
  return await fetcherClient.api.v1.permission.createPermission.post(
    permissionData,
  );
};

export const deletePermission = async (permissionId: number) => {
  return await fetcherClient.api.v1.permission
    .deletePermission({ permissionId })
    .delete();
};
