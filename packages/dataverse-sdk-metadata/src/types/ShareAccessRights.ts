/**
 * ShareAccessRights
 *
 * The Web API reads and writes enum members by name (`"None"`), never by number,
 * so this is a string union. `ShareAccessRights.None` is the name; each member's comment
 * gives its numeric value.
 */
export const ShareAccessRights = {
  /** 0 */
  None: "None",
  /** 1 */
  ReadAccess: "ReadAccess",
  /** 2 */
  WriteAccess: "WriteAccess",
  /** 4 */
  AppendAccess: "AppendAccess",
  /** 16 */
  AppendToAccess: "AppendToAccess",
  /** 32 */
  CreateAccess: "CreateAccess",
  /** 65536 */
  DeleteAccess: "DeleteAccess",
  /** 262144 */
  ShareAccess: "ShareAccess",
  /** 524288 */
  AssignAccess: "AssignAccess",
} as const;

export type ShareAccessRights = (typeof ShareAccessRights)[keyof typeof ShareAccessRights];
