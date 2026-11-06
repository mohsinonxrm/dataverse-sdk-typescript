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
 * RetrieveActivePath function
 *
 * Unbound function
 */
export class RetrieveActivePathFunction implements Executable<RetrieveActivePathResponse> {
  constructor(public readonly processInstanceId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveActivePath`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.processInstanceId !== undefined) {
      aliases.push(`ProcessInstanceId=@p1`);
      params.append("@p1", formatParameterAlias(this.processInstanceId, "Edm.Guid"));
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
    const data = await response.json();
    return data as RetrieveActivePathResponse;
  }
}
