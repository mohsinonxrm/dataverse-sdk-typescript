import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_TriggerPluginFixAnalysis action
 */
export interface CCaaS_TriggerPluginFixAnalysisResponse {
  ResponseBody: string;
}

/**
 * Parameters of the CCaaS_TriggerPluginFixAnalysis action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_TriggerPluginFixAnalysisActionParameters {
  PluginMode: string;
  PluginAssemblyName: string;
  AssemblyVersion: string;
  PluginType: string;
  ApiVersion: string;
}

/**
 * CCaaS_TriggerPluginFixAnalysis action
 *
 * Unbound action
 */
export class CCaaS_TriggerPluginFixAnalysisAction implements Executable<CCaaS_TriggerPluginFixAnalysisResponse> {
  constructor(public readonly parameters: CCaaS_TriggerPluginFixAnalysisActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_TriggerPluginFixAnalysis`;

    const body = requestBody({
      PluginMode: this.parameters.PluginMode,
      PluginAssemblyName: this.parameters.PluginAssemblyName,
      AssemblyVersion: this.parameters.AssemblyVersion,
      PluginType: this.parameters.PluginType,
      ApiVersion: this.parameters.ApiVersion,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CCaaS_TriggerPluginFixAnalysisResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_TriggerPluginFixAnalysisResponse;
    return (await response.json()) as CCaaS_TriggerPluginFixAnalysisResponse;
  }
}
