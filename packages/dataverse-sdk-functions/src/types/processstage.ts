/**
 * processstage entity type
 */
export interface processstage {
  _ownerid_value?: string;
  _parentprocessstageid_value?: string;
  _processid_value?: string;
  clientdata?: string;
  connector?: string;
  istrigger?: boolean;
  operationid?: string;
  operationkind?: number;
  operationtype?: number;
  owningbusinessunit?: string;
  parametername?: string;
  parametervalue?: string;
  primaryentitytypecode?: string;
  processstageid?: string;
  stagecategory?: number;
  stagename?: string;
  versionnumber?: number;
}
