import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_FetchOutreachEmailForAgentResponse as msdyn_SalesAgents_FetchOutreachEmailForAgentResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAgents_FetchOutreachEmailForAgent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_FetchOutreachEmailForAgentRequestParameters {
  msdyn_SalesAgentRunId?: string;
  msdyn_RegardingEntityName: string;
  msdyn_TrackingId?: string;
  msdyn_OutreachConfig?: string;
  msdyn_RegardingEntityId: string;
}

/**
 * msdyn_SalesAgents_FetchOutreachEmailForAgent request message
 *
 * Web API Action: msdyn_SalesAgents_FetchOutreachEmailForAgent
 */
export class msdyn_SalesAgents_FetchOutreachEmailForAgentRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_FetchOutreachEmailForAgentResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_FetchOutreachEmailForAgentRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_FetchOutreachEmailForAgentRequestParameters) {
    super("msdyn_SalesAgents_FetchOutreachEmailForAgent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_FetchOutreachEmailForAgent`;

    const body = requestBody({
      msdyn_SalesAgentRunId: this.Parameters.msdyn_SalesAgentRunId,
      msdyn_RegardingEntityName: this.Parameters.msdyn_RegardingEntityName,
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_OutreachConfig: this.Parameters.msdyn_OutreachConfig,
      msdyn_RegardingEntityId: this.Parameters.msdyn_RegardingEntityId,
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
  ): Promise<msdyn_SalesAgents_FetchOutreachEmailForAgentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesAgents_FetchOutreachEmailForAgentResponse.fromResponse({});
    return msdyn_SalesAgents_FetchOutreachEmailForAgentResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SalesAgents_FetchOutreachEmailForAgent response message
 */
export class msdyn_SalesAgents_FetchOutreachEmailForAgentResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_FetchOutreachEmailForAgentResponseData) {
    super("msdyn_SalesAgents_FetchOutreachEmailForAgent");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_FetchOutreachEmailForAgentResponse {
    return new msdyn_SalesAgents_FetchOutreachEmailForAgentResponse(
      responseObject<msdyn_SalesAgents_FetchOutreachEmailForAgentResponseData>(data)
    );
  }
}
