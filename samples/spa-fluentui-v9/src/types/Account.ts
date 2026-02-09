/**
 * Account type definition
 */

export interface Account {
  accountid: string;
  name: string;
  accountnumber?: string;
  telephone1?: string;
  emailaddress1?: string;
  revenue?: number;
  numberofemployees?: number;
  websiteurl?: string;
  address1_city?: string;
  address1_stateorprovince?: string;
  address1_country?: string;
  description?: string;
  createdon?: string;
  modifiedon?: string;
  _ownerid_value?: string;
  "@odata.etag"?: string;
}

export interface CreateAccountInput {
  name: string;
  accountnumber?: string;
  telephone1?: string;
  emailaddress1?: string;
  revenue?: number;
  numberofemployees?: number;
  websiteurl?: string;
  address1_city?: string;
  address1_stateorprovince?: string;
  address1_country?: string;
  description?: string;
}

export interface UpdateAccountInput extends Partial<CreateAccountInput> {
  accountid: string;
}
