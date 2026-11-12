/**
 * MissingPackageResolutionAction enum
 */
export const MissingPackageResolutionAction = {
  Install: 0,
  Update: 1,
  Ignore: 2,
} as const;

export type MissingPackageResolutionAction =
  (typeof MissingPackageResolutionAction)[keyof typeof MissingPackageResolutionAction];
