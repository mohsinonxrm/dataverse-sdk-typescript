/**
 * PresentInOrg
 *
 * The Web API reads and writes enum members by name (`"False"`), never by number,
 * so this is a string union. `PresentInOrg.False` is the name; each member's comment
 * gives its numeric value.
 */
export const PresentInOrg = {
  /** 0 */
  False: "False",
  /** 1 */
  True: "True",
  /** 2 */
  Unknown: "Unknown",
} as const;

export type PresentInOrg = (typeof PresentInOrg)[keyof typeof PresentInOrg];
