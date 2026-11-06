import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_InvokeTransformationAgentResponse as msdyn_InvokeTransformationAgentResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_InvokeTransformationAgent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InvokeTransformationAgentRequestParameters {
  msdyn_message?: string;
  msdyn_environmentid?: string;
  msdyn_conversationid?: string;
  msdyn_context?: string;
}

/**
 * msdyn_InvokeTransformationAgent request message
 *
 * Web API Action: msdyn_InvokeTransformationAgent
 */
export class msdyn_InvokeTransformationAgentRequest
  extends OrganizationRequest
  implements Executable<msdyn_InvokeTransformationAgentResponse>
{
  declare readonly Parameters: Readonly<msdyn_InvokeTransformationAgentRequestParameters>;

  constructor(parameters: msdyn_InvokeTransformationAgentRequestParameters = {}) {
    super("msdyn_InvokeTransformationAgent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeTransformationAgent`;

    const body = requestBody({
      msdyn_message: this.Parameters.msdyn_message,
      msdyn_environmentid: this.Parameters.msdyn_environmentid,
      msdyn_conversationid: this.Parameters.msdyn_conversationid,
      msdyn_context: this.Parameters.msdyn_context,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeTransformationAgentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_InvokeTransformationAgentResponse.fromResponse({});
    return msdyn_InvokeTransformationAgentResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_InvokeTransformationAgent response message
 */
export class msdyn_InvokeTransformationAgentResponse extends OrganizationResponse {
  constructor(public result: msdyn_InvokeTransformationAgentResponseData) {
    super("msdyn_InvokeTransformationAgent");
  }

  static fromResponse(data: unknown): msdyn_InvokeTransformationAgentResponse {
    return new msdyn_InvokeTransformationAgentResponse(
      responseObject<msdyn_InvokeTransformationAgentResponseData>(data)
    );
  }
}
