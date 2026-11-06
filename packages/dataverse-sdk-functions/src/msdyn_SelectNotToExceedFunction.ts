import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { msdyn_nottoexceed } from "./types/index.js";

/**
 * Response from msdyn_SelectNotToExceed function
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface msdyn_SelectNotToExceedResponse extends msdyn_nottoexceed {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * Parameters of the msdyn_SelectNotToExceed function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SelectNotToExceedFunctionParameters {
  msdyn_NTEType: number;
  msdyn_SelectNotToExceedFilters: string;
}

/**
 * msdyn_SelectNotToExceed function
 *
 * Unbound function
 */
export class msdyn_SelectNotToExceedFunction implements Executable<msdyn_SelectNotToExceedResponse> {
  constructor(public readonly parameters: msdyn_SelectNotToExceedFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/msdyn_SelectNotToExceed`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.msdyn_NTEType !== undefined) {
      aliases.push(`msdyn_NTEType=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.msdyn_NTEType, "Edm.Int32"));
    }
    if (this.parameters.msdyn_SelectNotToExceedFilters !== undefined) {
      aliases.push(`msdyn_SelectNotToExceedFilters=@p2`);
      params.append(
        "@p2",
        formatParameterAlias(this.parameters.msdyn_SelectNotToExceedFilters, "Edm.String")
      );
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

  async parseResponse(response: Response): Promise<msdyn_SelectNotToExceedResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_SelectNotToExceedResponse;
  }
}
