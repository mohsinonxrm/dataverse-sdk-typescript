import type { MissingPackageResolutionAction } from "./MissingPackageResolutionAction.js";

/**
 * MissingPackage
 */
export interface MissingPackage {
  AppName?: string;
  Version?: string;
  PackageName?: string;
  ResolutionAction?: MissingPackageResolutionAction;
  ResolutionActionValue?: string;
  IsFirstParty?: boolean;
}
