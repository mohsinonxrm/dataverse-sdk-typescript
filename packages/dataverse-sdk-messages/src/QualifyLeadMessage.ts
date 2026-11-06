import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { campaign, transactioncurrency } from "./types/index.js";

/**
 * Parameters of the QualifyLead message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface QualifyLeadRequestParameters {
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
 * QualifyLead request message
 *
 * Web API Action: QualifyLead
 *
 * The first argument is the id of the lead record to call it on.
 */
export class QualifyLeadRequest
  extends OrganizationRequest
  implements Executable<QualifyLeadResponse>
{
  declare readonly Parameters: Readonly<QualifyLeadRequestParameters>;

  constructor(
    public leadId: string,
    parameters: QualifyLeadRequestParameters
  ) {
    super("QualifyLead", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/leads(${this.leadId})/Microsoft.Dynamics.CRM.QualifyLead`;

    const body = requestBody({
      CreateAccount: this.Parameters.CreateAccount,
      CreateContact: this.Parameters.CreateContact,
      CreateOpportunity: this.Parameters.CreateOpportunity,
      OpportunityCurrencyId: this.Parameters.OpportunityCurrencyId,
      OpportunityCustomerId: this.Parameters.OpportunityCustomerId,
      SourceCampaignId: this.Parameters.SourceCampaignId,
      Status: this.Parameters.Status,
      ProcessInstanceId: this.Parameters.ProcessInstanceId,
      LeadQualificationV2Param: this.Parameters.LeadQualificationV2Param,
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
    if (response.status === 204) return QualifyLeadResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return QualifyLeadResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the QualifyLead action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type QualifyLeadResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * QualifyLead response message
 *
 * `result` is the value the QualifyLead action returns (see {@link QualifyLeadResult}).
 */
export class QualifyLeadResponse extends OrganizationResponse {
  constructor(public result: QualifyLeadResult) {
    super("QualifyLead");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): QualifyLeadResponse {
    return new QualifyLeadResponse(
      data === undefined ? [] : (data as { value: QualifyLeadResult }).value
    );
  }
}
