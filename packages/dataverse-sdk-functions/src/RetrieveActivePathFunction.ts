import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { processstage } from "./types/index.js";

/**
 * Response from RetrieveActivePath function
 */
export interface RetrieveActivePathResponse {
  value: processstage[];
}

/**
 * Parameters of the RetrieveActivePath function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveActivePathFunctionParameters {
  ProcessInstanceId: string;
}

/**
 * RetrieveActivePath function
 *
 * Unbound function
 */
export class RetrieveActivePathFunction implements Executable<RetrieveActivePathResponse> {
  constructor(public readonly parameters: RetrieveActivePathFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveActivePath`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.ProcessInstanceId !== undefined) {
      aliases.push(`ProcessInstanceId=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.ProcessInstanceId, "Edm.Guid"));
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

  async parseResponse(response: Response): Promise<RetrieveActivePathResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveActivePathResponse;
    return (await response.json()) as RetrieveActivePathResponse;
  }
}
