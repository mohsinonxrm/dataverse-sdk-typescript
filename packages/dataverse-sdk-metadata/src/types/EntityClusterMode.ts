/**
 * EntityClusterMode
 *
 * The Web API reads and writes enum members by name (`"Partitioned"`), never by number,
 * so this is a string union. `EntityClusterMode.Partitioned` is the name; each member's comment
 * gives its numeric value.
 */
export const EntityClusterMode = {
  /** 0 */
  Partitioned: "Partitioned",
  /** 1 */
  Replicated: "Replicated",
  /** 2 */
  Local: "Local",
  /** 3 */
  Inherited: "Inherited",
} as const;

export type EntityClusterMode = (typeof EntityClusterMode)[keyof typeof EntityClusterMode];
