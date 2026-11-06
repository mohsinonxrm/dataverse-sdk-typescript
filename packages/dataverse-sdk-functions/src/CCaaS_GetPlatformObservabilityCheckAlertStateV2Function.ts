import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from the CCaaS_GetPlatformObservabilityCheckAlertStateV2 function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_GetPlatformObservabilityCheckAlertStateV2Response {
  "@odata.context"?: string;
  ResponseBody: string;
}

/**
 * Parameters of the CCaaS_GetPlatformObservabilityCheckAlertStateV2 function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetPlatformObservabilityCheckAlertStateV2FunctionParameters {
  ApiVersion: string;
}

/**
 * CCaaS_GetPlatformObservabilityCheckAlertStateV2 function
 *
 * Unbound function
 */
export class CCaaS_GetPlatformObservabilityCheckAlertStateV2Function implements Executable<CCaaS_GetPlatformObservabilityCheckAlertStateV2Response> {
  constructor(
    public readonly parameters: CCaaS_GetPlatformObservabilityCheckAlertStateV2FunctionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/CCaaS_GetPlatformObservabilityCheckAlertStateV2`;

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
  ): Promise<CCaaS_GetPlatformObservabilityCheckAlertStateV2Response> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CCaaS_GetPlatformObservabilityCheckAlertStateV2Response;
  }
}
