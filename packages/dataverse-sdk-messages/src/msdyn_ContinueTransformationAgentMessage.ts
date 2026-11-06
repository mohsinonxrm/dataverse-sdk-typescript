import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ContinueTransformationAgentResponse as msdyn_ContinueTransformationAgentResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ContinueTransformationAgent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ContinueTransformationAgentRequestParameters {
  msdyn_conversationid: string;
  msdyn_environmentid?: string;
}

/**
 * msdyn_ContinueTransformationAgent request message
 *
 * Web API Action: msdyn_ContinueTransformationAgent
 */
export class msdyn_ContinueTransformationAgentRequest
  extends OrganizationRequest
  implements Executable<msdyn_ContinueTransformationAgentResponse>
{
  declare readonly Parameters: Readonly<msdyn_ContinueTransformationAgentRequestParameters>;

  constructor(parameters: msdyn_ContinueTransformationAgentRequestParameters) {
    super("msdyn_ContinueTransformationAgent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ContinueTransformationAgent`;

    const body = requestBody({
      msdyn_conversationid: this.Parameters.msdyn_conversationid,
      msdyn_environmentid: this.Parameters.msdyn_environmentid,
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

  async parseResponse(response: Response): Promise<msdyn_ContinueTransformationAgentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_ContinueTransformationAgentResponse.fromResponse({});
    return msdyn_ContinueTransformationAgentResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_ContinueTransformationAgent response message
 */
export class msdyn_ContinueTransformationAgentResponse extends OrganizationResponse {
  constructor(public result: msdyn_ContinueTransformationAgentResponseData) {
    super("msdyn_ContinueTransformationAgent");
  }

  static fromResponse(data: unknown): msdyn_ContinueTransformationAgentResponse {
    return new msdyn_ContinueTransformationAgentResponse(
      responseObject<msdyn_ContinueTransformationAgentResponseData>(data)
    );
  }
}
