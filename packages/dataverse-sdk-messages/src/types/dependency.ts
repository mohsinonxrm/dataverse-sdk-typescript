/**
 * dependency entity type
 */
export interface dependency {
  requiredcomponentobjectid: string;
  versionnumber: number;
  requiredcomponentparentid: string;
  dependentcomponentbasesolutionid: string;
  dependentcomponenttype: number;
  dependencyid: string;
  dependentcomponentparentid: string;
  _requiredcomponentnodeid_value: string;
  requiredcomponentintroducedversion: number;
  requiredcomponenttype: number;
  requiredcomponentbasesolutionid: string;
  dependencytype: number;
  dependentcomponentobjectid: string;
  _dependentcomponentnodeid_value: string;
}
