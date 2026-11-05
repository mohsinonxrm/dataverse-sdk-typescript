import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";

/**
 * Response from msdyn_getchannelendpointurl function
 */
export interface msdyn_getchannelendpointurlResponse {
  channelendpointurl: string;
  scopes: string[];
  tenant: string;
  channelbatchendpointurl: string;
}

/**
 * msdyn_getchannelendpointurl function
 *
 * Unbound function
 */
export class msdyn_getchannelendpointurlFunction implements Executable<msdyn_getchannelendpointurlResponse> {
  constructor(public readonly channeldefinitionid: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/msdyn_getchannelendpointurl`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.channeldefinitionid !== undefined) {
      aliases.push(`channeldefinitionid=@p1`);
      params.append("@p1", formatAliasValue(this.channeldefinitionid));
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

  async parseResponse(response: Response): Promise<msdyn_getchannelendpointurlResponse> {
    const data = await response.json();
    return data as msdyn_getchannelendpointurlResponse;
  }
}
