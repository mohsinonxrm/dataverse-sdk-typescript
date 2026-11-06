import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_CompleteOrchestration message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_CompleteOrchestrationRequestParameters {
  msdyn_SarRecordId: string;
  msdyn_TrackingId?: string;
  msdyn_SalesAgentType: number;
}

/**
 * msdyn_SalesAgents_CompleteOrchestration request message
 *
 * Web API Action: msdyn_SalesAgents_CompleteOrchestration
 */
export class msdyn_SalesAgents_CompleteOrchestrationRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_CompleteOrchestrationResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_CompleteOrchestrationRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_CompleteOrchestrationRequestParameters) {
    super("msdyn_SalesAgents_CompleteOrchestration", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_CompleteOrchestration`;

    const body = requestBody({
      msdyn_SarRecordId: this.Parameters.msdyn_SarRecordId,
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
  ): Promise<msdyn_SalesAgents_CompleteOrchestrationResponse> {
    // No return value (204 No Content)
    return new msdyn_SalesAgents_CompleteOrchestrationResponse();
  }
}

/**
 * msdyn_SalesAgents_CompleteOrchestration response message
 */
export class msdyn_SalesAgents_CompleteOrchestrationResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SalesAgents_CompleteOrchestration");
  }

  static fromResponse(_data: unknown): msdyn_SalesAgents_CompleteOrchestrationResponse {
    return new msdyn_SalesAgents_CompleteOrchestrationResponse();
  }
}
