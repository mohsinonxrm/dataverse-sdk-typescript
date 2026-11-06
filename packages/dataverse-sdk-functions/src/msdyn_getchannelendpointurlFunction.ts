import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from the msdyn_getchannelendpointurl function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_getchannelendpointurlResponse {
  "@odata.context"?: string;
  channelbatchendpointurl: string;
  channelendpointurl: string;
  scopes: string[];
  tenant: string;
}

/**
 * Parameters of the msdyn_getchannelendpointurl function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_getchannelendpointurlFunctionParameters {
  channeldefinitionid: string;
}

/**
 * msdyn_getchannelendpointurl function
 *
 * Unbound function
 */
export class msdyn_getchannelendpointurlFunction implements Executable<msdyn_getchannelendpointurlResponse> {
  constructor(public readonly parameters: msdyn_getchannelendpointurlFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/msdyn_getchannelendpointurl`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.channeldefinitionid !== undefined) {
      aliases.push(`channeldefinitionid=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.channeldefinitionid, "Edm.Guid"));
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_getchannelendpointurlResponse;
  }
}
