import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

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
 * Parameters of the CCaaS_GuidedAgentGroupTransferConsult function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GuidedAgentGroupTransferConsultFunctionParameters {
  IntentFamilyId: string;
  IntentGroupId?: string;
  IntentId?: string;
}

/**
 * CCaaS_GuidedAgentGroupTransferConsult function
 *
 * Bound function
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_GuidedAgentGroupTransferConsultFunction implements Executable<CCaaS_GuidedAgentGroupTransferConsultResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_GuidedAgentGroupTransferConsultFunctionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_GuidedAgentGroupTransferConsult`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.IntentFamilyId !== undefined) {
      aliases.push(`IntentFamilyId=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.IntentFamilyId, "Edm.Guid"));
    }
    if (this.parameters.IntentGroupId !== undefined) {
      aliases.push(`IntentGroupId=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.IntentGroupId, "Edm.Guid"));
    }
    if (this.parameters.IntentId !== undefined) {
      aliases.push(`IntentId=@p3`);
      params.append("@p3", formatParameterAlias(this.parameters.IntentId, "Edm.Guid"));
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as CCaaS_GuidedAgentGroupTransferConsultResponse;
  }
}
