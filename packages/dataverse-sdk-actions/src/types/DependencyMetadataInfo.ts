/**
 * DependencyMetadataInfo complex type
 */
export interface DependencyMetadataInfo {
  requiredcomponentobjectid?: string;
  requiredcomponentdisplayname?: string;
  requiredcomponenttype?: number;
  requiredcomponentname?: string;
  requiredcomponenttypename?: string;
  requiredcomponentbasesolutionid?: string;
  requiredcomponentbasesolutionname?: string;
  requiredcomponentbasesolutionuniquename?: string;
  requiredcomponentbasesolutionversion?: string;
  requiredcomponentparentid?: string;
  requiredcomponentparentdisplayname?: string;
  dependentcomponentobjectid?: string;
  dependentcomponentdisplayname?: string;
  dependentcomponenttype?: number;
  dependentcomponentname?: string;
  dependentcomponenttypename?: string;
  dependentcomponentbasesolutionid?: string;
  dependentcomponentbasesolutionname?: string;
  dependentcomponentbasesolutionuniquename?: string;
  dependentcomponentbasesolutionversion?: string;
  dependentcomponentparentid?: string;
  dependentcomponentparentdisplayname?: string;
  dependencyid?: string;
  dependencytype?: number;
  dependencytypename?: string;
  isdependencyremovalenabled?: boolean;
  dependentcomponententitysetname?: string;
  dependentcomponententitylogicalname?: string;
  requiredcomponententitylogicalname?: string;
}
