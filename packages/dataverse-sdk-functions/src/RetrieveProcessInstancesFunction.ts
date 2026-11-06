import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from RetrieveProcessInstances function
 */
export interface RetrieveProcessInstancesResponse {
  value: EntityReference[];
}

/**
 * RetrieveProcessInstances function
 *
 * Unbound function
 */
export class RetrieveProcessInstancesFunction implements Executable<RetrieveProcessInstancesResponse> {
  constructor(
    public readonly entityId: string,
    public readonly entityLogicalName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveProcessInstances`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.entityId !== undefined) {
      aliases.push(`EntityId=@p1`);
      params.append("@p1", formatParameterAlias(this.entityId, "Edm.Guid"));
    }
    if (this.entityLogicalName !== undefined) {
      aliases.push(`EntityLogicalName=@p2`);
      params.append("@p2", formatParameterAlias(this.entityLogicalName, "Edm.String"));
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

  async parseResponse(response: Response): Promise<RetrieveProcessInstancesResponse> {
    const data = await response.json();
    return data as RetrieveProcessInstancesResponse;
  }
}
