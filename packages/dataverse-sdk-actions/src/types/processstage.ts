/**
 * processstage entity type
 */
export interface processstage {
  versionnumber: number;
  connector: string;
  _parentprocessstageid_value: string;
  operationkind: number;
  processstageid: string;
  parametervalue: string;
  istrigger: boolean;
  stagecategory: number;
  owningbusinessunit: string;
  operationtype: number;
  parametername: string;
  _processid_value: string;
  _ownerid_value: string;
  primaryentitytypecode: string;
  clientdata: string;
  stagename: string;
  operationid: string;
}
