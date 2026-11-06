/**
 * msdyn_odosfeaturemetadata entity type
 */
export interface msdyn_odosfeaturemetadata {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_clientid?: string;
  msdyn_consentrevokedtime?: string;
  msdyn_entities?: string;
  msdyn_featurename?: string;
  msdyn_isconsentrevoked?: boolean;
  msdyn_isfeatureenabled?: boolean;
  msdyn_lastbackfillrunexecutionId?: string;
  msdyn_lastrunexecutionid?: string;
  msdyn_odosfeaturemetadataid?: string;
  msdyn_primitives?: string;
  msdyn_propertybag?: string;
  msdyn_provisioningexception?: string;
  msdyn_provisioningstage?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
