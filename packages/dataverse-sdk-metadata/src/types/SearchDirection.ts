/**
 * SearchDirection
 *
 * The Web API reads and writes enum members by name (`"Forward"`), never by number,
 * so this is a string union. `SearchDirection.Forward` is the name; each member's comment
 * gives its numeric value.
 */
export const SearchDirection = {
  /** 0 */
  Forward: "Forward",
  /** 1 */
  Backward: "Backward",
} as const;

export type SearchDirection = (typeof SearchDirection)[keyof typeof SearchDirection];
