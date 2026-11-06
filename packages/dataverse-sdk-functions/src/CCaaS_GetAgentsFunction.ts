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
 * CCaaS_GetAgents function
 *
 * Unbound function
 */
export class CCaaS_GetAgentsFunction implements Executable<CCaaS_GetAgentsResponse> {
  constructor(
    public readonly agentIds: string[] | undefined,
    public readonly agentType: string | undefined,
    public readonly queues: string[] | undefined,
    public readonly apiVersion: string,
    public readonly continuationToken?: string,
    public readonly name?: string,
    public readonly baseStatus?: string[],
    public readonly orderBy?: string
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
      params.append("@p2", formatParameterAlias(this.agentType, "Edm.String"));
    }
    if (this.queues !== undefined) {
      aliases.push(`Queues=@p3`);
      params.append("@p3", JSON.stringify(this.queues));
    }
    if (this.apiVersion !== undefined) {
      aliases.push(`ApiVersion=@p4`);
      params.append("@p4", formatParameterAlias(this.apiVersion, "Edm.String"));
    }
    if (this.continuationToken !== undefined) {
      aliases.push(`ContinuationToken=@p5`);
      params.append("@p5", formatParameterAlias(this.continuationToken, "Edm.String"));
    }
    if (this.name !== undefined) {
      aliases.push(`Name=@p6`);
      params.append("@p6", formatParameterAlias(this.name, "Edm.String"));
    }
    if (this.baseStatus !== undefined) {
      aliases.push(`BaseStatus=@p7`);
      params.append("@p7", JSON.stringify(this.baseStatus));
    }
    if (this.orderBy !== undefined) {
      aliases.push(`OrderBy=@p8`);
      params.append("@p8", formatParameterAlias(this.orderBy, "Edm.String"));
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
