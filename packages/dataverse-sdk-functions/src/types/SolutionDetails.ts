/**
 * SolutionDetails complex type
 */
export interface SolutionDetails {
  SolutionUniqueName?: string;
  SolutionFriendlyName?: string;
  SolutionDescription?: string;
  PublisherUniqueName?: string;
  PublisherFriendlyName?: string;
  PreviousSolutionUniqueName?: string;
  PreviousSolutionFriendlyName?: string;
  PreviousPublisherUniqueName?: string;
  PreviousPublisherFriendlyName?: string;
  IsPatchSolution?: boolean;
  IsManaged?: boolean;
  PreviousIsManaged?: boolean;
  SolutionVersion?: string;
  PreviousSolutionVersion?: string;
  PreviousPatchSolutionsNames?: string[];
  IsPrerequisitesExport?: boolean;
  HasPendingUpgrade?: boolean;
}
