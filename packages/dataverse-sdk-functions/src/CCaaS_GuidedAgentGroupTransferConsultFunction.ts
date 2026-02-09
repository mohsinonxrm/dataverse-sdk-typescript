import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_GuidedAgentGroupTransferConsult function
 */
export interface CCaaS_GuidedAgentGroupTransferConsultResponse {
  AgentGroupName: string;
  AgentGroupId: string;
  IntentId: string;
  IntentFamilyId: string;
  IntentGroupId: string;
}

/**
 * CCaaS_GuidedAgentGroupTransferConsult function
 *
 * Bound function
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 */
export class CCaaS_GuidedAgentGroupTransferConsultFunction implements Executable<CCaaS_GuidedAgentGroupTransferConsultResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly intentFamilyId: string,
    public readonly intentGroupId: string,
    public readonly intentId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_GuidedAgentGroupTransferConsult`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.intentFamilyId !== undefined) {
      aliases.push(`IntentFamilyId=@p1`);
      params.append(
        "@p1",
        typeof this.intentFamilyId === "string"
          ? `'${this.intentFamilyId}'`
          : String(this.intentFamilyId)
      );
    }
    if (this.intentGroupId !== undefined) {
      aliases.push(`IntentGroupId=@p2`);
      params.append(
        "@p2",
        typeof this.intentGroupId === "string"
          ? `'${this.intentGroupId}'`
          : String(this.intentGroupId)
      );
    }
    if (this.intentId !== undefined) {
      aliases.push(`IntentId=@p3`);
      params.append(
        "@p3",
        typeof this.intentId === "string" ? `'${this.intentId}'` : String(this.intentId)
      );
    }
    if (aliases.length > 0) {
      url += `(${aliases.join(",")})?${params.toString()}`;
    }

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<CCaaS_GuidedAgentGroupTransferConsultResponse> {
    const data = await response.json();
    return data as CCaaS_GuidedAgentGroupTransferConsultResponse;
  }
}
