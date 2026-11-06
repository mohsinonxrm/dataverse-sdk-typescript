import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from msdyn_GetEntityLinkChatConfiguration function
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface msdyn_GetEntityLinkChatConfigurationResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
}

/**
 * Parameters of the msdyn_GetEntityLinkChatConfiguration function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetEntityLinkChatConfigurationFunctionParameters {
  msdyn_RegardingEntityName: string;
}

/**
 * msdyn_GetEntityLinkChatConfiguration function
 *
 * Unbound function
 */
export class msdyn_GetEntityLinkChatConfigurationFunction implements Executable<msdyn_GetEntityLinkChatConfigurationResponse> {
  constructor(public readonly parameters: msdyn_GetEntityLinkChatConfigurationFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/msdyn_GetEntityLinkChatConfiguration`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.msdyn_RegardingEntityName !== undefined) {
      aliases.push(`msdyn_RegardingEntityName=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.parameters.msdyn_RegardingEntityName, "Edm.String")
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

  async parseResponse(response: Response): Promise<msdyn_GetEntityLinkChatConfigurationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetEntityLinkChatConfigurationResponse;
  }
}
