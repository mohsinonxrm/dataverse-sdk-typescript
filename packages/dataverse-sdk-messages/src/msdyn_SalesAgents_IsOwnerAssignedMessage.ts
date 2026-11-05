import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SalesAgents_IsOwnerAssignedResponse as msdyn_SalesAgents_IsOwnerAssignedResponseData } from "./types/index.js";

/**
 * msdyn_SalesAgents_IsOwnerAssigned request message
 *
 * Web API Action: msdyn_SalesAgents_IsOwnerAssigned
 */
export class msdyn_SalesAgents_IsOwnerAssignedRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_IsOwnerAssignedResponse>
{
  constructor(
    public msdyn_HandoverContext: string,
    public msdyn_SalesAgentRun: string,
    public msdyn_TrackingId: string
  ) {
    super("msdyn_SalesAgents_IsOwnerAssigned");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_IsOwnerAssigned`;

    const body: Record<string, unknown> = {
      msdyn_HandoverContext: this.msdyn_HandoverContext,
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_TrackingId: this.msdyn_TrackingId,
    };

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
    const data = await response.json();
    return msdyn_SalesAgents_IsOwnerAssignedResponse.fromResponse(data);
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
