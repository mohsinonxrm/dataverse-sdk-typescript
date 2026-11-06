/**
 * OrganizationState
 *
 * The Web API reads and writes enum members by name (`"Enabled"`), never by number,
 * so this is a string union. `OrganizationState.Enabled` is the name; each member's comment
 * gives its numeric value.
 */
export const OrganizationState = {
  /** 0 */
  Enabled: "Enabled",
  /** 1 */
  Disabled: "Disabled",
} as const;

export type OrganizationState = (typeof OrganizationState)[keyof typeof OrganizationState];
