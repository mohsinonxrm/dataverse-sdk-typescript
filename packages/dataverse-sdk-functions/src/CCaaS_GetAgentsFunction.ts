import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from CCaaS_GetAgents function
 */
export interface CCaaS_GetAgentsResponse {
  Agents: string;
  TransactionId: string;
  ContinuationToken: string;
}

/**
 * Parameters of the CCaaS_GetAgents function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetAgentsFunctionParameters {
  AgentIds?: string[];
  AgentType?: string;
  Queues?: string[];
  ApiVersion: string;
  ContinuationToken?: string;
  Name?: string;
  BaseStatus?: string[];
  OrderBy?: string;
}

/**
 * CCaaS_GetAgents function
 *
 * Unbound function
 */
export class CCaaS_GetAgentsFunction implements Executable<CCaaS_GetAgentsResponse> {
  constructor(public readonly parameters: CCaaS_GetAgentsFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/CCaaS_GetAgents`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.AgentIds !== undefined) {
      aliases.push(`AgentIds=@p1`);
      params.append("@p1", JSON.stringify(this.parameters.AgentIds));
    }
    if (this.parameters.AgentType !== undefined) {
      aliases.push(`AgentType=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.AgentType, "Edm.String"));
    }
    if (this.parameters.Queues !== undefined) {
      aliases.push(`Queues=@p3`);
      params.append("@p3", JSON.stringify(this.parameters.Queues));
    }
    if (this.parameters.ApiVersion !== undefined) {
      aliases.push(`ApiVersion=@p4`);
      params.append("@p4", formatParameterAlias(this.parameters.ApiVersion, "Edm.String"));
    }
    if (this.parameters.ContinuationToken !== undefined) {
      aliases.push(`ContinuationToken=@p5`);
      params.append("@p5", formatParameterAlias(this.parameters.ContinuationToken, "Edm.String"));
    }
    if (this.parameters.Name !== undefined) {
      aliases.push(`Name=@p6`);
      params.append("@p6", formatParameterAlias(this.parameters.Name, "Edm.String"));
    }
    if (this.parameters.BaseStatus !== undefined) {
      aliases.push(`BaseStatus=@p7`);
      params.append("@p7", JSON.stringify(this.parameters.BaseStatus));
    }
    if (this.parameters.OrderBy !== undefined) {
      aliases.push(`OrderBy=@p8`);
      params.append("@p8", formatParameterAlias(this.parameters.OrderBy, "Edm.String"));
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

  async parseResponse(response: Response): Promise<CCaaS_GetAgentsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as CCaaS_GetAgentsResponse;
  }
}
