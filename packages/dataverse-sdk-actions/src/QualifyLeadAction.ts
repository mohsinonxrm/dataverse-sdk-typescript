import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { campaign, transactioncurrency } from "./types/index.js";

/**
 * Response from the QualifyLead action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type QualifyLeadResponse = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * Parameters of the QualifyLead action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface QualifyLeadActionParameters {
  CreateAccount: boolean;
  CreateContact: boolean;
  CreateOpportunity: boolean;
  OpportunityCurrencyId?: EntityReference | EntityPayload<transactioncurrency>;
  OpportunityCustomerId?: EntityReference | AnyEntityPayload;
  SourceCampaignId?: EntityReference | EntityPayload<campaign>;
  Status: number;
  ProcessInstanceId?: EntityReference | AnyEntityPayload;
  LeadQualificationV2Param?: string;
}

/**
 * QualifyLead action
 *
 * Bound action
 * Binding parameter: entity (mscrm.lead)
 *
 * The first argument is the id of the lead record to call it on.
 */
export class QualifyLeadAction implements Executable<QualifyLeadResponse> {
  constructor(
    public readonly leadId: string,
    public readonly parameters: QualifyLeadActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/leads(${odataLiteral.guid(this.leadId)})/Microsoft.Dynamics.CRM.QualifyLead`;

    const body = requestBody({
      CreateAccount: this.parameters.CreateAccount,
      CreateContact: this.parameters.CreateContact,
      CreateOpportunity: this.parameters.CreateOpportunity,
      OpportunityCurrencyId: this.parameters.OpportunityCurrencyId,
      OpportunityCustomerId: this.parameters.OpportunityCustomerId,
      SourceCampaignId: this.parameters.SourceCampaignId,
      Status: this.parameters.Status,
      ProcessInstanceId: this.parameters.ProcessInstanceId,
      LeadQualificationV2Param: this.parameters.LeadQualificationV2Param,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<QualifyLeadResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: QualifyLeadResponse }).value;
  }
}
