import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_IsOwnerAssigned message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_IsOwnerAssignedRequestParameters {
  msdyn_TrackingId?: string;
  msdyn_HandoverContext?: string;
  msdyn_SalesAgentRun: string;
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
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_HandoverContext: this.Parameters.msdyn_HandoverContext,
      msdyn_SalesAgentRun: this.Parameters.msdyn_SalesAgentRun,
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
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_IsOwnerAssignedResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAgents_IsOwnerAssigned action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_IsOwnerAssignedResult {
  "@odata.context"?: string;
  IsOwnerAssignedResponse: boolean;
}

/**
 * msdyn_SalesAgents_IsOwnerAssigned response message
 *
 * `result` is the value the msdyn_SalesAgents_IsOwnerAssigned action returns (see {@link msdyn_SalesAgents_IsOwnerAssignedResult}).
 */
export class msdyn_SalesAgents_IsOwnerAssignedResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_IsOwnerAssignedResult) {
    super("msdyn_SalesAgents_IsOwnerAssigned");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_IsOwnerAssignedResponse {
    return new msdyn_SalesAgents_IsOwnerAssignedResponse(
      data as msdyn_SalesAgents_IsOwnerAssignedResult
    );
  }
}
