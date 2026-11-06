import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ExecuteAgentAssistToolsResponse as msdyn_ExecuteAgentAssistToolsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ExecuteAgentAssistTools message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExecuteAgentAssistToolsRequestParameters {
  ToolParameters: string;
  ToolName: string;
}

/**
 * msdyn_ExecuteAgentAssistTools request message
 *
 * Web API Action: msdyn_ExecuteAgentAssistTools
 */
export class msdyn_ExecuteAgentAssistToolsRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExecuteAgentAssistToolsResponse>
{
  declare readonly Parameters: Readonly<msdyn_ExecuteAgentAssistToolsRequestParameters>;

  constructor(parameters: msdyn_ExecuteAgentAssistToolsRequestParameters) {
    super("msdyn_ExecuteAgentAssistTools", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteAgentAssistTools`;

    const body = requestBody({
      ToolParameters: this.Parameters.ToolParameters,
      ToolName: this.Parameters.ToolName,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteAgentAssistToolsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_ExecuteAgentAssistToolsResponse.fromResponse({});
    return msdyn_ExecuteAgentAssistToolsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_ExecuteAgentAssistTools response message
 */
export class msdyn_ExecuteAgentAssistToolsResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExecuteAgentAssistToolsResponseData) {
    super("msdyn_ExecuteAgentAssistTools");
  }

  static fromResponse(data: unknown): msdyn_ExecuteAgentAssistToolsResponse {
    return new msdyn_ExecuteAgentAssistToolsResponse(
      responseObject<msdyn_ExecuteAgentAssistToolsResponseData>(data)
    );
  }
}
