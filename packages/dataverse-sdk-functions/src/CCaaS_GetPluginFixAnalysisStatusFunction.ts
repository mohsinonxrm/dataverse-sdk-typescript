import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from CCaaS_GetPluginFixAnalysisStatus function
 */
export interface CCaaS_GetPluginFixAnalysisStatusResponse {
  ResponseBody: string;
}

/**
 * Parameters of the CCaaS_GetPluginFixAnalysisStatus function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetPluginFixAnalysisStatusFunctionParameters {
  ApiVersion: string;
  AnalysisId: string;
}

/**
 * CCaaS_GetPluginFixAnalysisStatus function
 *
 * Unbound function
 */
export class CCaaS_GetPluginFixAnalysisStatusFunction implements Executable<CCaaS_GetPluginFixAnalysisStatusResponse> {
  constructor(public readonly parameters: CCaaS_GetPluginFixAnalysisStatusFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/CCaaS_GetPluginFixAnalysisStatus`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.ApiVersion !== undefined) {
      aliases.push(`ApiVersion=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.ApiVersion, "Edm.String"));
    }
    if (this.parameters.AnalysisId !== undefined) {
      aliases.push(`AnalysisId=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.AnalysisId, "Edm.String"));
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

  async parseResponse(response: Response): Promise<CCaaS_GetPluginFixAnalysisStatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_GetPluginFixAnalysisStatusResponse;
    return (await response.json()) as CCaaS_GetPluginFixAnalysisStatusResponse;
  }
}
