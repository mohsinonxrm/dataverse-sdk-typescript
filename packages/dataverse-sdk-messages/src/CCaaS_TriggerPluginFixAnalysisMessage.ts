import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return CCaaS_TriggerPluginFixAnalysisResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_TriggerPluginFixAnalysis action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_TriggerPluginFixAnalysisResult {
  "@odata.context"?: string;
  ResponseBody: string;
}

/**
 * CCaaS_TriggerPluginFixAnalysis response message
 *
 * `result` is the value the CCaaS_TriggerPluginFixAnalysis action returns (see {@link CCaaS_TriggerPluginFixAnalysisResult}).
 */
export class CCaaS_TriggerPluginFixAnalysisResponse extends OrganizationResponse {
  constructor(public result: CCaaS_TriggerPluginFixAnalysisResult) {
    super("CCaaS_TriggerPluginFixAnalysis");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_TriggerPluginFixAnalysisResponse {
    return new CCaaS_TriggerPluginFixAnalysisResponse(data as CCaaS_TriggerPluginFixAnalysisResult);
  }
}
