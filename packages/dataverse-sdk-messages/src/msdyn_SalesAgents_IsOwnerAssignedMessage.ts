import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_IsOwnerAssignedResponse as msdyn_SalesAgents_IsOwnerAssignedResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAgents_IsOwnerAssigned message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_IsOwnerAssignedRequestParameters {
  msdyn_HandoverContext?: string;
  msdyn_SalesAgentRun: string;
  msdyn_TrackingId?: string;
}

/**
 * msdyn_SalesAgents_IsOwnerAssigned request message
 *
 * Web API Action: msdyn_SalesAgents_IsOwnerAssigned
 */
export class msdyn_SalesAgents_IsOwnerAssignedRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_IsOwnerAssignedResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_IsOwnerAssignedRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_IsOwnerAssignedRequestParameters) {
    super("msdyn_SalesAgents_IsOwnerAssigned", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_IsOwnerAssigned`;

    const body = requestBody({
      msdyn_HandoverContext: this.Parameters.msdyn_HandoverContext,
      msdyn_SalesAgentRun: this.Parameters.msdyn_SalesAgentRun,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_IsOwnerAssignedResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_SalesAgents_IsOwnerAssignedResponse.fromResponse({});
    return msdyn_SalesAgents_IsOwnerAssignedResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SalesAgents_IsOwnerAssigned response message
 */
export class msdyn_SalesAgents_IsOwnerAssignedResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_IsOwnerAssignedResponseData) {
    super("msdyn_SalesAgents_IsOwnerAssigned");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_IsOwnerAssignedResponse {
    return new msdyn_SalesAgents_IsOwnerAssignedResponse(
      responseObject<msdyn_SalesAgents_IsOwnerAssignedResponseData>(data)
    );
  }
}
