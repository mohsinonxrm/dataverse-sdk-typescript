import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";

/**
 * Response from CCaaS_GetAgentsForConsultAndTransfer function
 */
export interface CCaaS_GetAgentsForConsultAndTransferResponse {
  Agents: string;
  TransactionId: string;
}

/**
 * CCaaS_GetAgentsForConsultAndTransfer function
 *
 * Bound function
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 */
export class CCaaS_GetAgentsForConsultAndTransferFunction implements Executable<CCaaS_GetAgentsForConsultAndTransferResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly agentSearchText: string,
    public readonly agentKind: number,
    public readonly queueId: string,
    public readonly commandType: string,
    public readonly getActiveConsultees: boolean,
    public readonly apiVersion: string,
    public readonly agentGroupId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_GetAgentsForConsultAndTransfer`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.agentSearchText !== undefined) {
      aliases.push(`AgentSearchText=@p1`);
      params.append("@p1", formatAliasValue(this.agentSearchText));
    }
    if (this.agentKind !== undefined) {
      aliases.push(`AgentKind=@p2`);
      params.append("@p2", formatAliasValue(this.agentKind));
    }
    if (this.queueId !== undefined) {
      aliases.push(`QueueId=@p3`);
      params.append("@p3", formatAliasValue(this.queueId));
    }
    if (this.commandType !== undefined) {
      aliases.push(`CommandType=@p4`);
      params.append("@p4", formatAliasValue(this.commandType));
    }
    if (this.getActiveConsultees !== undefined) {
      aliases.push(`GetActiveConsultees=@p5`);
      params.append("@p5", formatAliasValue(this.getActiveConsultees));
    }
    if (this.apiVersion !== undefined) {
      aliases.push(`ApiVersion=@p6`);
      params.append("@p6", formatAliasValue(this.apiVersion));
    }
    if (this.agentGroupId !== undefined) {
      aliases.push(`AgentGroupId=@p7`);
      params.append("@p7", formatAliasValue(this.agentGroupId));
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
    const data = await response.json();
    return data as CCaaS_GetAgentsForConsultAndTransferResponse;
  }
}
