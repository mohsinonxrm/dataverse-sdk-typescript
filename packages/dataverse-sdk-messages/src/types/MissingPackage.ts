import type { MissingPackageResolutionAction } from "./MissingPackageResolutionAction.js";

/**
 * MissingPackage complex type
 */
export interface MissingPackage {
  AppName?: string;
  IsFirstParty?: boolean;
  PackageName?: string;
  ResolutionAction?: MissingPackageResolutionAction;
  ResolutionActionValue?: string;
  Version?: string;
}
