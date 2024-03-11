import { canDelete, canEdit, canRead, canWrite } from "../common";

const NAMESPACE_RESOURCE: string = "namespace";

const canReadNameSpace = NAMESPACE_RESOURCE + canRead;
const canWriteNameSpace = NAMESPACE_RESOURCE + canWrite;
const canEditNameSpace = NAMESPACE_RESOURCE + canEdit;
const canDeleteNameSpace = NAMESPACE_RESOURCE + canDelete;

export {
  canReadNameSpace,
  canWriteNameSpace,
  canEditNameSpace,
  canDeleteNameSpace,
};
