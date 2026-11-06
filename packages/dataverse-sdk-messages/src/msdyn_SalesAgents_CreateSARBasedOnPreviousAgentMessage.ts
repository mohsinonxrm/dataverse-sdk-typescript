import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_CreateSARBasedOnPreviousAgent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_CreateSARBasedOnPreviousAgentRequestParameters {
  msdyn_PreviousSarRecordId: string;
  msdyn_TrackingId?: string;
  msdyn_SalesAgentType: number;
}

/**
 * msdyn_SalesAgents_CreateSARBasedOnPreviousAgent request message
 *
 * Web API Action: msdyn_SalesAgents_CreateSARBasedOnPreviousAgent
 */
export class msdyn_SalesAgents_CreateSARBasedOnPreviousAgentRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_CreateSARBasedOnPreviousAgentResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_CreateSARBasedOnPreviousAgentRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_CreateSARBasedOnPreviousAgentRequestParameters) {
    super("msdyn_SalesAgents_CreateSARBasedOnPreviousAgent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_CreateSARBasedOnPreviousAgent`;

    const body = requestBody({
      msdyn_PreviousSarRecordId: this.Parameters.msdyn_PreviousSarRecordId,
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
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
  ): Promise<msdyn_SalesAgents_CreateSARBasedOnPreviousAgentResponse> {
    // No return value (204 No Content)
    return new msdyn_SalesAgents_CreateSARBasedOnPreviousAgentResponse();
  }
}

/**
 * msdyn_SalesAgents_CreateSARBasedOnPreviousAgent response message
 */
export class msdyn_SalesAgents_CreateSARBasedOnPreviousAgentResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SalesAgents_CreateSARBasedOnPreviousAgent");
  }

  static fromResponse(_data: unknown): msdyn_SalesAgents_CreateSARBasedOnPreviousAgentResponse {
    return new msdyn_SalesAgents_CreateSARBasedOnPreviousAgentResponse();
  }
}
