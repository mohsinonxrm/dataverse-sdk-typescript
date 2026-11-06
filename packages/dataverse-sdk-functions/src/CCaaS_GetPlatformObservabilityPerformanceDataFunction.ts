import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from CCaaS_GetPlatformObservabilityPerformanceData function
 */
export interface CCaaS_GetPlatformObservabilityPerformanceDataResponse {
  ResponseBody: string;
}

/**
 * Parameters of the CCaaS_GetPlatformObservabilityPerformanceData function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetPlatformObservabilityPerformanceDataFunctionParameters {
  ApiVersion: string;
}

/**
 * CCaaS_GetPlatformObservabilityPerformanceData function
 *
 * Unbound function
 */
export class CCaaS_GetPlatformObservabilityPerformanceDataFunction implements Executable<CCaaS_GetPlatformObservabilityPerformanceDataResponse> {
  constructor(
    public readonly parameters: CCaaS_GetPlatformObservabilityPerformanceDataFunctionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/CCaaS_GetPlatformObservabilityPerformanceData`;

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

  async parseResponse(
    response: Response
  ): Promise<CCaaS_GetPlatformObservabilityPerformanceDataResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_GetPlatformObservabilityPerformanceDataResponse;
    return (await response.json()) as CCaaS_GetPlatformObservabilityPerformanceDataResponse;
  }
}
