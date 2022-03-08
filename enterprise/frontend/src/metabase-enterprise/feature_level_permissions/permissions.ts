import { GroupsPermissions } from "metabase-types/api";
import {
  DATA_ACCESS_IS_REQUIRED,
  UNABLE_TO_CHANGE_ADMIN_PERMISSIONS,
} from "metabase/admin/permissions/constants/messages";
import { DatabaseEntityId } from "metabase/admin/permissions/types";
import {
  getSchemasPermission,
  isRestrictivePermission,
} from "metabase/admin/permissions/utils/graph";
import { DOWNLOAD_PERMISSION_OPTIONS } from "./constants";

const buildDownloadPermission = (
  entityId: DatabaseEntityId,
  groupId: number,
  isAdmin: boolean,
  permissions: GroupsPermissions,
  dataAccessPermissionValue: string,
) => {
  const value = getSchemasPermission(
    permissions,
    groupId,
    entityId,
    "download",
  );

  const isDisabled =
    isAdmin || isRestrictivePermission(dataAccessPermissionValue);

  return {
    permission: "download",
    name: "download",
    isDisabled,
    disabledTooltip: isAdmin
      ? UNABLE_TO_CHANGE_ADMIN_PERMISSIONS
      : DATA_ACCESS_IS_REQUIRED,
    isHighlighted: isAdmin,
    value,
    options: [
      DOWNLOAD_PERMISSION_OPTIONS.none,
      DOWNLOAD_PERMISSION_OPTIONS.limited,
      DOWNLOAD_PERMISSION_OPTIONS.full,
    ],
  };
};

export const getFeatureLevelDataPermissions = (
  entityId: DatabaseEntityId,
  groupId: number,
  isAdmin: boolean,
  permissions: GroupsPermissions,
  dataAccessPermissionValue: string,
) => {
  const downloadPermission = buildDownloadPermission(
    entityId,
    groupId,
    isAdmin,
    permissions,
    dataAccessPermissionValue,
  );
  return [downloadPermission];
};
