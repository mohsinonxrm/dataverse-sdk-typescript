/**
 * PropagationOwnershipOptions
 *
 * The Web API reads and writes enum members by name (`"None"`), never by number,
 * so this is a string union. `PropagationOwnershipOptions.None` is the name; each member's comment
 * gives its numeric value.
 */
export const PropagationOwnershipOptions = {
  /** 0 */
  None: "None",
  /** 1 */
  Caller: "Caller",
  /** 2 */
  ListMemberOwner: "ListMemberOwner",
} as const;

export type PropagationOwnershipOptions =
  (typeof PropagationOwnershipOptions)[keyof typeof PropagationOwnershipOptions];
