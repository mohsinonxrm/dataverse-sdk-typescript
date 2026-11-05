import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_GetEntityLinkChatConfiguration function
 */
export interface msdyn_GetEntityLinkChatConfigurationResponse {
  value: EntityReference;
}

/**
 * msdyn_GetEntityLinkChatConfiguration function
 *
 * Unbound function
 */
export class msdyn_GetEntityLinkChatConfigurationFunction implements Executable<msdyn_GetEntityLinkChatConfigurationResponse> {
  constructor(public readonly msdyn_RegardingEntityName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/msdyn_GetEntityLinkChatConfiguration`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.msdyn_RegardingEntityName !== undefined) {
      aliases.push(`msdyn_RegardingEntityName=@p1`);
      params.append("@p1", formatParameterAlias(this.msdyn_RegardingEntityName, "Edm.String"));
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
    const data = await response.json();
    return data as msdyn_GetEntityLinkChatConfigurationResponse;
  }
}
