import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * customapirequestparameter entity type
 */
export interface customapirequestparameter {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _customapiid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  customapirequestparameterid?: string;
  description?: string;
  displayname?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  isoptional?: boolean;
  logicalentityname?: string;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  type?: number;
  uniquename?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
