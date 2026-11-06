/**
 * OptionSetType
 *
 * The Web API reads and writes enum members by name (`"Picklist"`), never by number,
 * so this is a string union. `OptionSetType.Picklist` is the name; each member's comment
 * gives its numeric value.
 */
export const OptionSetType = {
  /** 0 */
  Picklist: "Picklist",
  /** 1 */
  State: "State",
  /** 2 */
  Status: "Status",
  /** 3 */
  Boolean: "Boolean",
} as const;

export type OptionSetType = (typeof OptionSetType)[keyof typeof OptionSetType];
