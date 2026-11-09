import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_TriggerOutreachAgent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_TriggerOutreachAgentRequestParameters {
  msdyn_SalesAgentRun: string;
  msdyn_TrackingId: string;
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
      msdyn_SalesAgentRun: this.Parameters.msdyn_SalesAgentRun,
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
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
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_TriggerOutreachAgentResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAgents_TriggerOutreachAgent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_TriggerOutreachAgentResult {
  "@odata.context"?: string;
  msdyn_Response: string;
}

/**
 * msdyn_SalesAgents_TriggerOutreachAgent response message
 *
 * `result` is the value the msdyn_SalesAgents_TriggerOutreachAgent action returns (see {@link msdyn_SalesAgents_TriggerOutreachAgentResult}).
 */
export class msdyn_SalesAgents_TriggerOutreachAgentResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_TriggerOutreachAgentResult) {
    super("msdyn_SalesAgents_TriggerOutreachAgent");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_TriggerOutreachAgentResponse {
    return new msdyn_SalesAgents_TriggerOutreachAgentResponse(
      data as msdyn_SalesAgents_TriggerOutreachAgentResult
    );
  }
}
