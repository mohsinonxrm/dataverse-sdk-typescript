import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from the msdyn_GetEntityLinkChatConfiguration function.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type msdyn_GetEntityLinkChatConfigurationResponse = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as msdyn_GetEntityLinkChatConfigurationResponse;
  }
}
