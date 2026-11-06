import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from CCaaS_GetClientLWIContext function
 */
export interface CCaaS_GetClientLWIContextResponse {
  contextItems: string;
  liveWorkStreamId: string;
  liveWorkItemId: string;
}

/**
 * Parameters of the CCaaS_GetClientLWIContext function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetClientLWIContextFunctionParameters {
  ApiVersion: string;
}

/**
 * CCaaS_GetClientLWIContext function
 *
 * Bound function
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_GetClientLWIContextFunction implements Executable<CCaaS_GetClientLWIContextResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_GetClientLWIContextFunctionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_GetClientLWIContext`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.ApiVersion !== undefined) {
      aliases.push(`ApiVersion=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.ApiVersion, "Edm.String"));
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

  async parseResponse(response: Response): Promise<CCaaS_GetClientLWIContextResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_GetClientLWIContextResponse;
    return (await response.json()) as CCaaS_GetClientLWIContextResponse;
  }
}
