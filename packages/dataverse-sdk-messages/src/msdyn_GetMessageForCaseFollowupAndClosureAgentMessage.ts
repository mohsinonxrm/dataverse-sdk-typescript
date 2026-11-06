import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetMessageForCaseFollowupAndClosureAgentResponse as msdyn_GetMessageForCaseFollowupAndClosureAgentResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetMessageForCaseFollowupAndClosureAgent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetMessageForCaseFollowupAndClosureAgentRequestParameters {
  msdyn_payload: string;
}

/**
 * msdyn_GetMessageForCaseFollowupAndClosureAgent request message
 *
 * Web API Action: msdyn_GetMessageForCaseFollowupAndClosureAgent
 */
export class msdyn_GetMessageForCaseFollowupAndClosureAgentRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetMessageForCaseFollowupAndClosureAgentResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetMessageForCaseFollowupAndClosureAgentRequestParameters>;

  constructor(parameters: msdyn_GetMessageForCaseFollowupAndClosureAgentRequestParameters) {
    super("msdyn_GetMessageForCaseFollowupAndClosureAgent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetMessageForCaseFollowupAndClosureAgent`;

    const body = requestBody({
      msdyn_payload: this.Parameters.msdyn_payload,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetMessageForCaseFollowupAndClosureAgentResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetMessageForCaseFollowupAndClosureAgentResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_GetMessageForCaseFollowupAndClosureAgent response message
 */
export class msdyn_GetMessageForCaseFollowupAndClosureAgentResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetMessageForCaseFollowupAndClosureAgentResponseData) {
    super("msdyn_GetMessageForCaseFollowupAndClosureAgent");
  }

  static fromResponse(data: unknown): msdyn_GetMessageForCaseFollowupAndClosureAgentResponse {
    return new msdyn_GetMessageForCaseFollowupAndClosureAgentResponse(
      responseObject<msdyn_GetMessageForCaseFollowupAndClosureAgentResponseData>(data)
    );
  }
}
