import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from the CCaaS_GetAgents function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_GetAgentsResponse {
  "@odata.context"?: string;
  Agents: string;
  ContinuationToken: string;
  TransactionId: string;
}

/**
 * Parameters of the CCaaS_GetAgents function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetAgentsFunctionParameters {
  OrderBy?: string;
  ApiVersion: string;
  Queues?: string[];
  BaseStatus?: string[];
  AgentType?: string;
  AgentIds?: string[];
  Name?: string;
  ContinuationToken?: string;
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
    if (this.parameters.OrderBy !== undefined) {
      aliases.push(`OrderBy=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.OrderBy, "Edm.String"));
    }
    if (this.parameters.ApiVersion !== undefined) {
      aliases.push(`ApiVersion=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.ApiVersion, "Edm.String"));
    }
    if (this.parameters.Queues !== undefined) {
      aliases.push(`Queues=@p3`);
      params.append("@p3", JSON.stringify(this.parameters.Queues));
    }
    if (this.parameters.BaseStatus !== undefined) {
      aliases.push(`BaseStatus=@p4`);
      params.append("@p4", JSON.stringify(this.parameters.BaseStatus));
    }
    if (this.parameters.AgentType !== undefined) {
      aliases.push(`AgentType=@p5`);
      params.append("@p5", formatParameterAlias(this.parameters.AgentType, "Edm.String"));
    }
    if (this.parameters.AgentIds !== undefined) {
      aliases.push(`AgentIds=@p6`);
      params.append("@p6", JSON.stringify(this.parameters.AgentIds));
    }
    if (this.parameters.Name !== undefined) {
      aliases.push(`Name=@p7`);
      params.append("@p7", formatParameterAlias(this.parameters.Name, "Edm.String"));
    }
    if (this.parameters.ContinuationToken !== undefined) {
      aliases.push(`ContinuationToken=@p8`);
      params.append("@p8", formatParameterAlias(this.parameters.ContinuationToken, "Edm.String"));
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CCaaS_GetAgentsResponse;
  }
}
