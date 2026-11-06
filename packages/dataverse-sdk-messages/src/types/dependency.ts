/**
 * dependency entity type
 */
export interface dependency {
  _dependentcomponentnodeid_value?: string;
  _requiredcomponentnodeid_value?: string;
  dependencyid?: string;
  dependencytype?: number;
  dependentcomponentbasesolutionid?: string;
  dependentcomponentobjectid?: string;
  dependentcomponentparentid?: string;
  dependentcomponenttype?: number;
  requiredcomponentbasesolutionid?: string;
  requiredcomponentintroducedversion?: number;
  requiredcomponentobjectid?: string;
  requiredcomponentparentid?: string;
  requiredcomponenttype?: number;
  versionnumber?: number;
}
