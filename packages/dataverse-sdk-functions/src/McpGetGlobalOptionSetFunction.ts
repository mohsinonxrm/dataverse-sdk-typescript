import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from McpGetGlobalOptionSet function
 */
export interface McpGetGlobalOptionSetResponse {
  definition: string;
}

/**
 * Parameters of the McpGetGlobalOptionSet function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface McpGetGlobalOptionSetFunctionParameters {
  optionSetName: string;
}

/**
 * McpGetGlobalOptionSet function
 *
 * Unbound function
 */
export class McpGetGlobalOptionSetFunction implements Executable<McpGetGlobalOptionSetResponse> {
  constructor(public readonly parameters: McpGetGlobalOptionSetFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/McpGetGlobalOptionSet`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.optionSetName !== undefined) {
      aliases.push(`optionSetName=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.optionSetName, "Edm.String"));
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

  async parseResponse(response: Response): Promise<McpGetGlobalOptionSetResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as McpGetGlobalOptionSetResponse;
    return (await response.json()) as McpGetGlobalOptionSetResponse;
  }
}
