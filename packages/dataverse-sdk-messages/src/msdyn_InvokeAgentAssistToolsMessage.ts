import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_InvokeAgentAssistToolsResponse as msdyn_InvokeAgentAssistToolsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_InvokeAgentAssistTools message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InvokeAgentAssistToolsRequestParameters {
  ToolParameters: string;
  ToolName: string;
}

/**
 * msdyn_InvokeAgentAssistTools request message
 *
 * Web API Action: msdyn_InvokeAgentAssistTools
 */
export class msdyn_InvokeAgentAssistToolsRequest
  extends OrganizationRequest
  implements Executable<msdyn_InvokeAgentAssistToolsResponse>
{
  declare readonly Parameters: Readonly<msdyn_InvokeAgentAssistToolsRequestParameters>;

  constructor(parameters: msdyn_InvokeAgentAssistToolsRequestParameters) {
    super("msdyn_InvokeAgentAssistTools", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeAgentAssistTools`;

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

  async parseResponse(response: Response): Promise<msdyn_InvokeAgentAssistToolsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_InvokeAgentAssistToolsResponse.fromResponse({});
    return msdyn_InvokeAgentAssistToolsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_InvokeAgentAssistTools response message
 */
export class msdyn_InvokeAgentAssistToolsResponse extends OrganizationResponse {
  constructor(public result: msdyn_InvokeAgentAssistToolsResponseData) {
    super("msdyn_InvokeAgentAssistTools");
  }

  static fromResponse(data: unknown): msdyn_InvokeAgentAssistToolsResponse {
    return new msdyn_InvokeAgentAssistToolsResponse(
      responseObject<msdyn_InvokeAgentAssistToolsResponseData>(data)
    );
  }
}
