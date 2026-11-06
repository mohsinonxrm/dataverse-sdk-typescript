import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_ProcessOutreachAgentResponseResponse as msdyn_SalesAgents_ProcessOutreachAgentResponseResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAgents_ProcessOutreachAgentResponse message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_ProcessOutreachAgentResponseRequestParameters {
  msdyn_SalesAgentRunId: string;
  msdyn_TrackingId: string;
  msdyn_Email: string;
}

/**
 * msdyn_SalesAgents_ProcessOutreachAgentResponse request message
 *
 * Web API Action: msdyn_SalesAgents_ProcessOutreachAgentResponse
 */
export class msdyn_SalesAgents_ProcessOutreachAgentResponseRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_ProcessOutreachAgentResponseResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_ProcessOutreachAgentResponseRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_ProcessOutreachAgentResponseRequestParameters) {
    super("msdyn_SalesAgents_ProcessOutreachAgentResponse", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ProcessOutreachAgentResponse`;

    const body = requestBody({
      msdyn_SalesAgentRunId: this.Parameters.msdyn_SalesAgentRunId,
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_Email: this.Parameters.msdyn_Email,
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
  ): Promise<msdyn_SalesAgents_ProcessOutreachAgentResponseResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesAgents_ProcessOutreachAgentResponseResponse.fromResponse({});
    return msdyn_SalesAgents_ProcessOutreachAgentResponseResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SalesAgents_ProcessOutreachAgentResponse response message
 */
export class msdyn_SalesAgents_ProcessOutreachAgentResponseResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_ProcessOutreachAgentResponseResponseData) {
    super("msdyn_SalesAgents_ProcessOutreachAgentResponse");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_ProcessOutreachAgentResponseResponse {
    return new msdyn_SalesAgents_ProcessOutreachAgentResponseResponse(
      responseObject<msdyn_SalesAgents_ProcessOutreachAgentResponseResponseData>(data)
    );
  }
}
