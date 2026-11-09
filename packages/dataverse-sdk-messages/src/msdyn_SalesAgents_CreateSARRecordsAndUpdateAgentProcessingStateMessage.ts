import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingState message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateRequestParameters {
  msdyn_SARRecordsToCreate: string;
  msdyn_SalesAgentType: number;
  msdyn_TrackingId?: string;
}

/**
 * msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingState request message
 *
 * Web API Action: msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingState
 */
export class msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateRequestParameters>;

  constructor(
    parameters: msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateRequestParameters
  ) {
    super("msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingState", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingState`;

    const body = requestBody({
      msdyn_SARRecordsToCreate: this.Parameters.msdyn_SARRecordsToCreate,
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

  parseResponse(
    _response: Response
  ): Promise<msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateResponse> {
    // No return value (204 No Content)
    return Promise.resolve(
      new msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateResponse()
    );
  }
}

/**
 * msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingState response message
 */
export class msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingState");
  }

  static fromResponse(
    _data?: unknown
  ): msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateResponse {
    return new msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateResponse();
  }
}
