import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from msdyn_getinboundurl function
 */
export interface msdyn_getinboundurlResponse {
  inboundurl: string;
  tenant: string;
  scopes: string[];
}

/**
 * Parameters of the msdyn_getinboundurl function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_getinboundurlFunctionParameters {
  contactpoint: string;
  channeldefinitionid: string;
}

/**
 * msdyn_getinboundurl function
 *
 * Unbound function
 */
export class msdyn_getinboundurlFunction implements Executable<msdyn_getinboundurlResponse> {
  constructor(public readonly parameters: msdyn_getinboundurlFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/msdyn_getinboundurl`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.contactpoint !== undefined) {
      aliases.push(`contactpoint=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.contactpoint, "Edm.String"));
    }
    if (this.parameters.channeldefinitionid !== undefined) {
      aliases.push(`channeldefinitionid=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.channeldefinitionid, "Edm.Guid"));
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

  async parseResponse(response: Response): Promise<msdyn_getinboundurlResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_getinboundurlResponse;
  }
}
