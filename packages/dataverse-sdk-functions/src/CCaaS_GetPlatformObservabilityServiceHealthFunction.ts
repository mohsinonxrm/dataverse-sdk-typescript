import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from the CCaaS_GetPlatformObservabilityServiceHealth function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_GetPlatformObservabilityServiceHealthResponse {
  "@odata.context"?: string;
  ResponseBody: string;
}

/**
 * Parameters of the CCaaS_GetPlatformObservabilityServiceHealth function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetPlatformObservabilityServiceHealthFunctionParameters {
  Area?: string;
  ApiVersion: string;
}

/**
 * CCaaS_GetPlatformObservabilityServiceHealth function
 *
 * Unbound function
 */
export class CCaaS_GetPlatformObservabilityServiceHealthFunction implements Executable<CCaaS_GetPlatformObservabilityServiceHealthResponse> {
  constructor(
    public readonly parameters: CCaaS_GetPlatformObservabilityServiceHealthFunctionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/CCaaS_GetPlatformObservabilityServiceHealth`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.Area !== undefined) {
      aliases.push(`Area=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.Area, "Edm.String"));
    }
    if (this.parameters.ApiVersion !== undefined) {
      aliases.push(`ApiVersion=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.ApiVersion, "Edm.String"));
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

  async parseResponse(
    response: Response
  ): Promise<CCaaS_GetPlatformObservabilityServiceHealthResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CCaaS_GetPlatformObservabilityServiceHealthResponse;
  }
}
