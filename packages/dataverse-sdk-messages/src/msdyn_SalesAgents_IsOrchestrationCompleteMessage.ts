import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_IsOrchestrationCompleteResponse as msdyn_SalesAgents_IsOrchestrationCompleteResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAgents_IsOrchestrationComplete message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_IsOrchestrationCompleteRequestParameters {
  msdyn_TrackingId?: string;
  msdyn_AgentType: number;
  msdyn_SalesAgentType: number;
}

/**
 * msdyn_SalesAgents_IsOrchestrationComplete request message
 *
 * Web API Action: msdyn_SalesAgents_IsOrchestrationComplete
 */
export class msdyn_SalesAgents_IsOrchestrationCompleteRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_IsOrchestrationCompleteResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_IsOrchestrationCompleteRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_IsOrchestrationCompleteRequestParameters) {
    super("msdyn_SalesAgents_IsOrchestrationComplete", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_IsOrchestrationComplete`;

    const body = requestBody({
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_AgentType: this.Parameters.msdyn_AgentType,
      msdyn_SalesAgentType: this.Parameters.msdyn_SalesAgentType,
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
  ): Promise<msdyn_SalesAgents_IsOrchestrationCompleteResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SalesAgents_IsOrchestrationCompleteResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_SalesAgents_IsOrchestrationComplete response message
 */
export class msdyn_SalesAgents_IsOrchestrationCompleteResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_IsOrchestrationCompleteResponseData) {
    super("msdyn_SalesAgents_IsOrchestrationComplete");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_IsOrchestrationCompleteResponse {
    return new msdyn_SalesAgents_IsOrchestrationCompleteResponse(
      responseObject<msdyn_SalesAgents_IsOrchestrationCompleteResponseData>(data)
    );
  }
}
