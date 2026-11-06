import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse as msdyn_SalesAgents_ShouldRunAgentOrchestrationResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAgents_ShouldRunAgentOrchestration message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_ShouldRunAgentOrchestrationRequestParameters {
  msdyn_SalesAgentType: number;
  msdyn_TrackingId?: string;
}

/**
 * msdyn_SalesAgents_ShouldRunAgentOrchestration request message
 *
 * Web API Action: msdyn_SalesAgents_ShouldRunAgentOrchestration
 */
export class msdyn_SalesAgents_ShouldRunAgentOrchestrationRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_ShouldRunAgentOrchestrationRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_ShouldRunAgentOrchestrationRequestParameters) {
    super("msdyn_SalesAgents_ShouldRunAgentOrchestration", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ShouldRunAgentOrchestration`;

    const body = requestBody({
      msdyn_SalesAgentType: this.Parameters.msdyn_SalesAgentType,
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
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
  ): Promise<msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse.fromResponse({});
    return msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SalesAgents_ShouldRunAgentOrchestration response message
 */
export class msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_ShouldRunAgentOrchestrationResponseData) {
    super("msdyn_SalesAgents_ShouldRunAgentOrchestration");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse {
    return new msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse(
      responseObject<msdyn_SalesAgents_ShouldRunAgentOrchestrationResponseData>(data)
    );
  }
}
