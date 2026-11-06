import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_TriggerPluginFixAnalysisResponse as CCaaS_TriggerPluginFixAnalysisResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_TriggerPluginFixAnalysis message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_TriggerPluginFixAnalysisRequestParameters {
  PluginMode: string;
  PluginAssemblyName: string;
  AssemblyVersion: string;
  PluginType: string;
  ApiVersion: string;
}

/**
 * CCaaS_TriggerPluginFixAnalysis request message
 *
 * Web API Action: CCaaS_TriggerPluginFixAnalysis
 */
export class CCaaS_TriggerPluginFixAnalysisRequest
  extends OrganizationRequest
  implements Executable<CCaaS_TriggerPluginFixAnalysisResponse>
{
  declare readonly Parameters: Readonly<CCaaS_TriggerPluginFixAnalysisRequestParameters>;

  constructor(parameters: CCaaS_TriggerPluginFixAnalysisRequestParameters) {
    super("CCaaS_TriggerPluginFixAnalysis", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_TriggerPluginFixAnalysis`;

    const body = requestBody({
      PluginMode: this.Parameters.PluginMode,
      PluginAssemblyName: this.Parameters.PluginAssemblyName,
      AssemblyVersion: this.Parameters.AssemblyVersion,
      PluginType: this.Parameters.PluginType,
      ApiVersion: this.Parameters.ApiVersion,
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
    if (response.status === 204) return CCaaS_TriggerPluginFixAnalysisResponse.fromResponse({});
    return CCaaS_TriggerPluginFixAnalysisResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_TriggerPluginFixAnalysis response message
 */
export class CCaaS_TriggerPluginFixAnalysisResponse extends OrganizationResponse {
  constructor(public result: CCaaS_TriggerPluginFixAnalysisResponseData) {
    super("CCaaS_TriggerPluginFixAnalysis");
  }

  static fromResponse(data: unknown): CCaaS_TriggerPluginFixAnalysisResponse {
    return new CCaaS_TriggerPluginFixAnalysisResponse(
      responseObject<CCaaS_TriggerPluginFixAnalysisResponseData>(data)
    );
  }
}
