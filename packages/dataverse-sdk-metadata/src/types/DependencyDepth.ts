/**
 * DependencyDepth
 *
 * The Web API reads and writes enum members by name (`"Unknown"`), never by number,
 * so this is a string union. `DependencyDepth.Unknown` is the name; each member's comment
 * gives its numeric value.
 */
export const DependencyDepth = {
  /** 0 */
  Unknown: "Unknown",
  /** 1 */
  OnDemandWithContext: "OnDemandWithContext",
  /** 2 */
  OnDemandWithoutContext: "OnDemandWithoutContext",
  /** 3 */
  OnDemandContextOnly: "OnDemandContextOnly",
  /** 4 */
  Offline: "Offline",
  /** 5 */
  Mobile: "Mobile",
  /** 6 */
  UserContext: "UserContext",
  /** 7 */
  NoDependency: "NoDependency",
} as const;

export type DependencyDepth = (typeof DependencyDepth)[keyof typeof DependencyDepth];
