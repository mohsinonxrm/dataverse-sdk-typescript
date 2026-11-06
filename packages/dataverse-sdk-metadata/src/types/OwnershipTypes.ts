/**
 * OwnershipTypes
 *
 * The Web API reads and writes enum members by name (`"None"`), never by number,
 * so this is a string union. `OwnershipTypes.None` is the name; each member's comment
 * gives its numeric value.
 */
export const OwnershipTypes = {
  /** 0 */
  None: "None",
  /** 1 */
  UserOwned: "UserOwned",
  /** 2 */
  TeamOwned: "TeamOwned",
  /** 4 */
  BusinessOwned: "BusinessOwned",
  /** 8 */
  OrganizationOwned: "OrganizationOwned",
  /** 16 */
  BusinessParented: "BusinessParented",
  /** 32 */
  Filtered: "Filtered",
} as const;

export type OwnershipTypes = (typeof OwnershipTypes)[keyof typeof OwnershipTypes];
