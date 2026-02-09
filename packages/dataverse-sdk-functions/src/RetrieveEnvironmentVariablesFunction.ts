import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { getEntitySetNameFromReference } from "./types/EntityReference.js";

/**
 * Response from RetrieveEnvironmentVariables function
 */
export interface RetrieveEnvironmentVariablesResponse {
  value: EntityReference[];
}

/**
 * RetrieveEnvironmentVariables function
 *
 * Unbound function
 */
export class RetrieveEnvironmentVariablesFunction implements Executable<RetrieveEnvironmentVariablesResponse> {
  constructor(public readonly schemaNames: string[]) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveEnvironmentVariables`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.schemaNames !== undefined) {
      aliases.push(`SchemaNames=@p1`);
      params.append("@p1", JSON.stringify(this.schemaNames));
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

  async parseResponse(response: Response): Promise<RetrieveEnvironmentVariablesResponse> {
    const data = await response.json();
    return data as RetrieveEnvironmentVariablesResponse;
  }
}
