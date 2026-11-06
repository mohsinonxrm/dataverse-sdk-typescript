import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";

/**
 * Response from RetrieveAppComponents function
 */
export interface RetrieveAppComponentsResponse {
  value: EntityReference[];
}

/**
 * Parameters of the RetrieveAppComponents function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveAppComponentsFunctionParameters {
  AppModuleId: string;
}

/**
 * RetrieveAppComponents function
 *
 * Unbound function
 */
export class RetrieveAppComponentsFunction implements Executable<RetrieveAppComponentsResponse> {
  constructor(public readonly parameters: RetrieveAppComponentsFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveAppComponents`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.AppModuleId !== undefined) {
      aliases.push(`AppModuleId=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.AppModuleId, "Edm.Guid"));
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

  async parseResponse(response: Response): Promise<RetrieveAppComponentsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveAppComponentsResponse;
    return (await response.json()) as RetrieveAppComponentsResponse;
  }
}
