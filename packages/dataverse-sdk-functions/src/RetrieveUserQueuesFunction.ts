import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { queue } from "./types/index.js";

/**
 * Response from RetrieveUserQueues function
 */
export interface RetrieveUserQueuesResponse {
  value: queue[];
}

/**
 * RetrieveUserQueues function
 *
 * Bound function
 * Binding parameter: entity (mscrm.systemuser)
 */
export class RetrieveUserQueuesFunction implements Executable<RetrieveUserQueuesResponse> {
  constructor(
    public readonly systemuserId: string,
    public readonly includePublic: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.RetrieveUserQueues`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.includePublic !== undefined) {
      aliases.push(`IncludePublic=@p1`);
      params.append("@p1", formatParameterAlias(this.includePublic, "Edm.Boolean"));
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

  async parseResponse(response: Response): Promise<RetrieveUserQueuesResponse> {
    const data = await response.json();
    return data as RetrieveUserQueuesResponse;
  }
}
