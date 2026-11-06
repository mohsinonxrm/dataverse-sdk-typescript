/** The columns the scenarios read, typed as the Web API returns them. */

export interface Contact {
  contactid: string;
  fullname?: string | null;
  emailaddress1?: string | null;
  jobtitle?: string | null;
}

export interface Account {
  accountid: string;
  name?: string | null;
  address1_city?: string | null;
  revenue?: number | null;
  numberofemployees?: number | null;
  telephone1?: string | null;
  statecode?: number;
  "@odata.etag"?: string;
  primarycontactid?: Contact | null;
  contact_customer_accounts?: Contact[];
  /** Formatted values and lookup annotations, when `Prefer: odata.include-annotations` asks for them. */
  [annotation: `${string}@${string}`]: unknown;
}

export interface SystemUser {
  systemuserid: string;
  fullname?: string | null;
  internalemailaddress?: string | null;
  azureactivedirectoryobjectid?: string | null;
}
