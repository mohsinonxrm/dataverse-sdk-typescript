/**
 * SolutionDetails complex type
 */
export interface SolutionDetails {
  HasPendingUpgrade?: boolean;
  IsCabFile?: boolean;
  IsManaged?: boolean;
  IsPatchSolution?: boolean;
  IsPrerequisitesExport?: boolean;
  PreviousIsManaged?: boolean;
  PreviousPatchSolutionsNames?: string[];
  PreviousPublisherFriendlyName?: string;
  PreviousPublisherUniqueName?: string;
  PreviousSolutionFriendlyName?: string;
  PreviousSolutionUniqueName?: string;
  PreviousSolutionVersion?: string;
  PublisherFriendlyName?: string;
  PublisherUniqueName?: string;
  SolutionDescription?: string;
  SolutionFriendlyName?: string;
  SolutionUniqueName?: string;
  SolutionVersion?: string;
}
