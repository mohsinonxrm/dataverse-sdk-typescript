import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";

/**
 * Response from CCaaS_GetAgents function
 */
export interface CCaaS_GetAgentsResponse {
  Agents: string;
  TransactionId: string;
  ContinuationToken: string;
}

/**
 * CCaaS_GetAgents function
 *
 * Unbound function
 */
export class CCaaS_GetAgentsFunction implements Executable<CCaaS_GetAgentsResponse> {
  constructor(
    public readonly agentIds: string[],
    public readonly agentType: string,
    public readonly queues: string[],
    public readonly apiVersion: string,
    public readonly continuationToken: string,
    public readonly name: string,
    public readonly baseStatus: string[],
    public readonly orderBy: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/CCaaS_GetAgents`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.agentIds !== undefined) {
      aliases.push(`AgentIds=@p1`);
      params.append("@p1", JSON.stringify(this.agentIds));
    }
    if (this.agentType !== undefined) {
      aliases.push(`AgentType=@p2`);
      params.append("@p2", formatAliasValue(this.agentType));
    }
    if (this.queues !== undefined) {
      aliases.push(`Queues=@p3`);
      params.append("@p3", JSON.stringify(this.queues));
    }
    if (this.apiVersion !== undefined) {
      aliases.push(`ApiVersion=@p4`);
      params.append("@p4", formatAliasValue(this.apiVersion));
    }
    if (this.continuationToken !== undefined) {
      aliases.push(`ContinuationToken=@p5`);
      params.append("@p5", formatAliasValue(this.continuationToken));
    }
    if (this.name !== undefined) {
      aliases.push(`Name=@p6`);
      params.append("@p6", formatAliasValue(this.name));
    }
    if (this.baseStatus !== undefined) {
      aliases.push(`BaseStatus=@p7`);
      params.append("@p7", JSON.stringify(this.baseStatus));
    }
    if (this.orderBy !== undefined) {
      aliases.push(`OrderBy=@p8`);
      params.append("@p8", formatAliasValue(this.orderBy));
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
    const data = await response.json();
    return data as CCaaS_GetAgentsResponse;
  }
}
