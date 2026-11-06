import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from RetrieveEnvironmentVariables function
 */
export interface RetrieveEnvironmentVariablesResponse {
  value: EntityReference[];
}

/**
 * Parameters of the RetrieveEnvironmentVariables function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveEnvironmentVariablesFunctionParameters {
  SchemaNames?: string[];
}

/**
 * RetrieveEnvironmentVariables function
 *
 * Unbound function
 */
export class RetrieveEnvironmentVariablesFunction implements Executable<RetrieveEnvironmentVariablesResponse> {
  constructor(public readonly parameters: RetrieveEnvironmentVariablesFunctionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveEnvironmentVariables`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.SchemaNames !== undefined) {
      aliases.push(`SchemaNames=@p1`);
      params.append("@p1", JSON.stringify(this.parameters.SchemaNames));
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveEnvironmentVariablesResponse;
    return (await response.json()) as RetrieveEnvironmentVariablesResponse;
  }
}
