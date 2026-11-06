import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";

/**
 * Response from RetrieveProcessInstances function
 */
export interface RetrieveProcessInstancesResponse {
  value: EntityReference[];
}

/**
 * Parameters of the RetrieveProcessInstances function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveProcessInstancesFunctionParameters {
  EntityId: string;
  EntityLogicalName: string;
}

/**
 * RetrieveProcessInstances function
 *
 * Unbound function
 */
export class RetrieveProcessInstancesFunction implements Executable<RetrieveProcessInstancesResponse> {
  constructor(public readonly parameters: RetrieveProcessInstancesFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveProcessInstances`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.EntityId !== undefined) {
      aliases.push(`EntityId=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.EntityId, "Edm.Guid"));
    }
    if (this.parameters.EntityLogicalName !== undefined) {
      aliases.push(`EntityLogicalName=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.EntityLogicalName, "Edm.String"));
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveProcessInstancesResponse;
    return (await response.json()) as RetrieveProcessInstancesResponse;
  }
}
