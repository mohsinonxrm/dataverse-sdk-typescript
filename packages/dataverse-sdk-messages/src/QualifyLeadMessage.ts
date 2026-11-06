import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
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
    // 204 No Content is an empty result
    if (response.status === 204) return QualifyLeadResponse.fromResponse({});
    return QualifyLeadResponse.fromResponse(await response.json());
  }
}

/**
 * QualifyLead response message
 */
export class QualifyLeadResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("QualifyLead");
  }

  static fromResponse(data: unknown): QualifyLeadResponse {
    return new QualifyLeadResponse(responseValue<Record<string, unknown>[]>(data));
  }
}
