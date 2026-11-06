/**
 * TargetFieldType
 *
 * The Web API reads and writes enum members by name (`"All"`), never by number,
 * so this is a string union. `TargetFieldType.All` is the name; each member's comment
 * gives its numeric value.
 */
export const TargetFieldType = {
  /** 0 */
  All: "All",
  /** 1 */
  ValidForCreate: "ValidForCreate",
  /** 2 */
  ValidForUpdate: "ValidForUpdate",
  /** 3 */
  ValidForRead: "ValidForRead",
} as const;

export type TargetFieldType = (typeof TargetFieldType)[keyof typeof TargetFieldType];
