/**
 * MissingPackageResolutionAction
 *
 * The Web API reads and writes enum members by name (`"Install"`), never by number,
 * so this is a string union. `MissingPackageResolutionAction.Install` is the name; each member's comment
 * gives its numeric value.
 */
export const MissingPackageResolutionAction = {
  /** 0 */
  Install: "Install",
  /** 1 */
  Update: "Update",
  /** 2 */
  Ignore: "Ignore",
} as const;

export type MissingPackageResolutionAction =
  (typeof MissingPackageResolutionAction)[keyof typeof MissingPackageResolutionAction];
