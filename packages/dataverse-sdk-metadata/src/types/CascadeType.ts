/**
 * CascadeType
 *
 * The Web API reads and writes enum members by name (`"NoCascade"`), never by number,
 * so this is a string union. `CascadeType.NoCascade` is the name; each member's comment
 * gives its numeric value.
 */
export const CascadeType = {
  /** 0 */
  NoCascade: "NoCascade",
  /** 1 */
  Cascade: "Cascade",
  /** 2 */
  Active: "Active",
  /** 3 */
  UserOwned: "UserOwned",
  /** 4 */
  RemoveLink: "RemoveLink",
  /** 5 */
  Restrict: "Restrict",
} as const;

export type CascadeType = (typeof CascadeType)[keyof typeof CascadeType];
