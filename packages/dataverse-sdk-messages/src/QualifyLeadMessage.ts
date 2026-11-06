import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { campaign, transactioncurrency } from "./types/index.js";

/**
 * QualifyLead request message
 *
 * Web API Action: QualifyLead
 */
export class QualifyLeadRequest
  extends OrganizationRequest
  implements Executable<QualifyLeadResponse>
{
  constructor(
    public leadId: string,
    public createAccount: boolean,
    public createContact: boolean,
    public createOpportunity: boolean,
    public opportunityCurrencyId: EntityReference | EntityPayload<transactioncurrency> | undefined,
    public opportunityCustomerId: EntityReference | AnyEntityPayload | undefined,
    public sourceCampaignId: EntityReference | EntityPayload<campaign> | undefined,
    public status: number,
    public processInstanceId?: EntityReference | AnyEntityPayload,
    public leadQualificationV2Param?: string
  ) {
    super("QualifyLead");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/leads(${this.leadId})/Microsoft.Dynamics.CRM.QualifyLead`;

    const body: Record<string, unknown> = {
      CreateAccount: this.createAccount,
      CreateContact: this.createContact,
      CreateOpportunity: this.createOpportunity,
      OpportunityCurrencyId: this.opportunityCurrencyId,
      OpportunityCustomerId: this.opportunityCustomerId,
      SourceCampaignId: this.sourceCampaignId,
      Status: this.status,
      ProcessInstanceId: this.processInstanceId,
      LeadQualificationV2Param: this.leadQualificationV2Param,
    };

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
    const data = await response.json();
    return QualifyLeadResponse.fromResponse(data);
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
