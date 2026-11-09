import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_BatchUpdateSARStates message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_BatchUpdateSARStatesRequestParameters {
  msdyn_StateCode: number;
  msdyn_SalesAgentRunIds: string[];
  msdyn_StatusCode: number;
  msdyn_TrackingId?: string;
}

/**
 * msdyn_SalesAgents_BatchUpdateSARStates request message
 *
 * Web API Action: msdyn_SalesAgents_BatchUpdateSARStates
 */
export class msdyn_SalesAgents_BatchUpdateSARStatesRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_BatchUpdateSARStatesResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_BatchUpdateSARStatesRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_BatchUpdateSARStatesRequestParameters) {
    super("msdyn_SalesAgents_BatchUpdateSARStates", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_BatchUpdateSARStates`;

    const body = requestBody({
      msdyn_StateCode: this.Parameters.msdyn_StateCode,
      msdyn_SalesAgentRunIds: this.Parameters.msdyn_SalesAgentRunIds,
      msdyn_StatusCode: this.Parameters.msdyn_StatusCode,
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

  parseResponse(_response: Response): Promise<msdyn_SalesAgents_BatchUpdateSARStatesResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_SalesAgents_BatchUpdateSARStatesResponse());
  }
}

/**
 * msdyn_SalesAgents_BatchUpdateSARStates response message
 */
export class msdyn_SalesAgents_BatchUpdateSARStatesResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SalesAgents_BatchUpdateSARStates");
  }

  static fromResponse(_data?: unknown): msdyn_SalesAgents_BatchUpdateSARStatesResponse {
    return new msdyn_SalesAgents_BatchUpdateSARStatesResponse();
  }
}
