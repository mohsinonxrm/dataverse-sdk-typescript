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
 * msdyn_getinboundurl function
 *
 * Unbound function
 */
export class msdyn_getinboundurlFunction implements Executable<msdyn_getinboundurlResponse> {
  constructor(
    public readonly contactpoint: string,
    public readonly channeldefinitionid: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/msdyn_getinboundurl`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.contactpoint !== undefined) {
      aliases.push(`contactpoint=@p1`);
      params.append("@p1", formatParameterAlias(this.contactpoint, "Edm.String"));
    }
    if (this.channeldefinitionid !== undefined) {
      aliases.push(`channeldefinitionid=@p2`);
      params.append("@p2", formatParameterAlias(this.channeldefinitionid, "Edm.Guid"));
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
    const data = await response.json();
    return data as msdyn_getinboundurlResponse;
  }
}
