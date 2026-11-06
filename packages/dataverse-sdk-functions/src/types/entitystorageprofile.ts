/**
 * entitystorageprofile entity type
 */
export interface entitystorageprofile {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _policycriterionid_value?: string;
  actionid?: string;
  actiontype?: number;
  avgcascaderecordcount?: number;
  avgcascadesizebytes?: number;
  avgrecordsizebytes?: number;
  cascadeentitybreakdown?: string;
  createdon?: string;
  entityid?: string;
  entitylogicalname?: string;
  entityobjecttypecode?: number;
  entitystorageprofileid?: string;
  importsequencenumber?: number;
  isliked?: boolean;
  lastevaluatedon?: string;
  logicalcollectionname?: string;
  matchingrecordcount?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  samplesize?: number;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  totaldatasizebytes?: number;
  totalindexsizebytes?: number;
  totalrecordcount?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
