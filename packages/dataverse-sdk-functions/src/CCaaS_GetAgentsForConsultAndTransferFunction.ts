import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from CCaaS_GetAgentsForConsultAndTransfer function
 */
export interface CCaaS_GetAgentsForConsultAndTransferResponse {
  Agents: string;
  TransactionId: string;
}

/**
 * Parameters of the CCaaS_GetAgentsForConsultAndTransfer function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetAgentsForConsultAndTransferFunctionParameters {
  AgentSearchText?: string;
  AgentKind: number;
  QueueId?: string;
  CommandType: string;
  GetActiveConsultees?: boolean;
  ApiVersion: string;
  AgentGroupId?: string;
}

/**
 * CCaaS_GetAgentsForConsultAndTransfer function
 *
 * Bound function
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_GetAgentsForConsultAndTransferFunction implements Executable<CCaaS_GetAgentsForConsultAndTransferResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_GetAgentsForConsultAndTransferFunctionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_GetAgentsForConsultAndTransfer`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.AgentSearchText !== undefined) {
      aliases.push(`AgentSearchText=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.AgentSearchText, "Edm.String"));
    }
    if (this.parameters.AgentKind !== undefined) {
      aliases.push(`AgentKind=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.AgentKind, "Edm.Int32"));
    }
    if (this.parameters.QueueId !== undefined) {
      aliases.push(`QueueId=@p3`);
      params.append("@p3", formatParameterAlias(this.parameters.QueueId, "Edm.Guid"));
    }
    if (this.parameters.CommandType !== undefined) {
      aliases.push(`CommandType=@p4`);
      params.append("@p4", formatParameterAlias(this.parameters.CommandType, "Edm.String"));
    }
    if (this.parameters.GetActiveConsultees !== undefined) {
      aliases.push(`GetActiveConsultees=@p5`);
      params.append(
        "@p5",
        formatParameterAlias(this.parameters.GetActiveConsultees, "Edm.Boolean")
      );
    }
    if (this.parameters.ApiVersion !== undefined) {
      aliases.push(`ApiVersion=@p6`);
      params.append("@p6", formatParameterAlias(this.parameters.ApiVersion, "Edm.String"));
    }
    if (this.parameters.AgentGroupId !== undefined) {
      aliases.push(`AgentGroupId=@p7`);
      params.append("@p7", formatParameterAlias(this.parameters.AgentGroupId, "Edm.Guid"));
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

  async parseResponse(response: Response): Promise<CCaaS_GetAgentsForConsultAndTransferResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_GetAgentsForConsultAndTransferResponse;
    return (await response.json()) as CCaaS_GetAgentsForConsultAndTransferResponse;
  }
}
