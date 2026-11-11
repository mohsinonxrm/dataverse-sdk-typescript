/**
 * AccessRights enum
 *
 * A flags enum: combine members with `|`, so the type is `number`.
 */
export const AccessRights = {
  None: 0,
  ReadAccess: 1,
  WriteAccess: 2,
  AppendAccess: 4,
  AppendToAccess: 16,
  CreateAccess: 32,
  DeleteAccess: 65536,
  ShareAccess: 262144,
  AssignAccess: 524288,
} as const;

export type AccessRights = number;
