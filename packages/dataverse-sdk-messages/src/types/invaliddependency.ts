/**
 * invaliddependency entity type
 */
export interface invaliddependency {
  existingcomponentid?: string;
  existingcomponenttype?: number;
  existingdependencytype?: number;
  invaliddependencyid?: string;
  isexistingnoderequiredcomponent?: boolean;
  missingcomponentid?: string;
  missingcomponentinfo?: string;
  missingcomponentlookuptype?: number;
  missingcomponenttype?: number;
}
