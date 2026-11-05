import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { campaign, transactioncurrency } from "./types/index.js";

/**
 * Response from QualifyLead action
 */
export interface QualifyLeadResponse {
  value: EntityReference[];
}

/**
 * QualifyLead action
 *
 * Bound action
 * Binding parameter: entity (mscrm.lead)
 */
export class QualifyLeadAction implements Executable<QualifyLeadResponse> {
  constructor(
    public readonly leadId: string,
    public readonly createAccount: boolean,
    public readonly createContact: boolean,
    public readonly createOpportunity: boolean,
    public readonly opportunityCurrencyId: transactioncurrency,
    public readonly opportunityCustomerId: EntityReference,
    public readonly sourceCampaignId: campaign,
    public readonly status: number,
    public readonly processInstanceId: EntityReference,
    public readonly leadQualificationV2Param: string
  ) {}

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
    return data as QualifyLeadResponse;
  }
}
