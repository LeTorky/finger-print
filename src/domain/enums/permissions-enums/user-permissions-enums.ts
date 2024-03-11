import { canDelete, canEdit, canRead, canWrite } from "../common";

const USER_RESOURCE: string = "user";

const canReadUser = USER_RESOURCE + canRead;
const canWriteUser = USER_RESOURCE + canWrite;
const canEditUser = USER_RESOURCE + canEdit;
const canDeleteUser = USER_RESOURCE + canDelete;

export { canReadUser, canWriteUser, canEditUser, canDeleteUser };
