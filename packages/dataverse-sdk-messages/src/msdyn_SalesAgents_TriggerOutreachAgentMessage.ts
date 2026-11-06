import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_TriggerOutreachAgentResponse as msdyn_SalesAgents_TriggerOutreachAgentResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAgents_TriggerOutreachAgent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_TriggerOutreachAgentRequestParameters {
  msdyn_TrackingId: string;
  msdyn_SalesAgentRun: string;
  msdyn_OutreachConfig?: string;
}

/**
 * msdyn_SalesAgents_TriggerOutreachAgent request message
 *
 * Web API Action: msdyn_SalesAgents_TriggerOutreachAgent
 */
export class msdyn_SalesAgents_TriggerOutreachAgentRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_TriggerOutreachAgentResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_TriggerOutreachAgentRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_TriggerOutreachAgentRequestParameters) {
    super("msdyn_SalesAgents_TriggerOutreachAgent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_TriggerOutreachAgent`;

    const body = requestBody({
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_SalesAgentRun: this.Parameters.msdyn_SalesAgentRun,
      msdyn_OutreachConfig: this.Parameters.msdyn_OutreachConfig,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_TriggerOutreachAgentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesAgents_TriggerOutreachAgentResponse.fromResponse({});
    return msdyn_SalesAgents_TriggerOutreachAgentResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SalesAgents_TriggerOutreachAgent response message
 */
export class msdyn_SalesAgents_TriggerOutreachAgentResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_TriggerOutreachAgentResponseData) {
    super("msdyn_SalesAgents_TriggerOutreachAgent");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_TriggerOutreachAgentResponse {
    return new msdyn_SalesAgents_TriggerOutreachAgentResponse(
      responseObject<msdyn_SalesAgents_TriggerOutreachAgentResponseData>(data)
    );
  }
}
