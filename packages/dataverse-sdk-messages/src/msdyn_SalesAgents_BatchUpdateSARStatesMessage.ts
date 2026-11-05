import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesAgents_BatchUpdateSARStates request message
 *
 * Web API Action: msdyn_SalesAgents_BatchUpdateSARStates
 */
export class msdyn_SalesAgents_BatchUpdateSARStatesRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_BatchUpdateSARStatesResponse>
{
  constructor(
    public msdyn_StateCode: number,
    public msdyn_StatusCode: number,
    public msdyn_TrackingId: string,
    public msdyn_SalesAgentRunIds: string[]
  ) {
    super("msdyn_SalesAgents_BatchUpdateSARStates");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_BatchUpdateSARStates`;

    const body: Record<string, unknown> = {
      msdyn_StateCode: this.msdyn_StateCode,
      msdyn_StatusCode: this.msdyn_StatusCode,
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_SalesAgentRunIds: this.msdyn_SalesAgentRunIds,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_BatchUpdateSARStatesResponse> {
    // No return value (204 No Content)
    return new msdyn_SalesAgents_BatchUpdateSARStatesResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_StateCode: this.msdyn_StateCode,
      msdyn_StatusCode: this.msdyn_StatusCode,
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_SalesAgentRunIds: this.msdyn_SalesAgentRunIds,
    };
  }
}

/**
 * msdyn_SalesAgents_BatchUpdateSARStates response message
 */
export class msdyn_SalesAgents_BatchUpdateSARStatesResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SalesAgents_BatchUpdateSARStates");
  }

  static fromResponse(_data: unknown): msdyn_SalesAgents_BatchUpdateSARStatesResponse {
    return new msdyn_SalesAgents_BatchUpdateSARStatesResponse();
  }
}
