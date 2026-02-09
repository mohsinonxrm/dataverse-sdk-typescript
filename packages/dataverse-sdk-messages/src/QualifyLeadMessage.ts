import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
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
    public opportunityCurrencyId: transactioncurrency,
    public opportunityCustomerId: EntityReference,
    public sourceCampaignId: campaign,
    public status: number,
    public processInstanceId: EntityReference,
    public leadQualificationV2Param: string
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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<QualifyLeadResponse> {
    const data = await response.json();
    return QualifyLeadResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.leadId,
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
  }
}

/**
 * QualifyLead response message
 */
export class QualifyLeadResponse extends OrganizationResponse {
  constructor(public result: EntityReference[]) {
    super("QualifyLead");
  }

  static fromResponse(data: unknown): QualifyLeadResponse {
    return new QualifyLeadResponse((data as any).value);
  }
}
