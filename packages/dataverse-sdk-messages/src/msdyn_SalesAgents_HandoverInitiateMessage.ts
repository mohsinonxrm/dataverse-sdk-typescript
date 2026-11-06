import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_HandoverInitiate message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_HandoverInitiateRequestParameters {
  msdyn_TrackingId?: string;
  msdyn_HandoverIntent?: number;
  msdyn_AssignTo?: number;
  msdyn_SalesAgentRun: string;
  msdyn_HandoverTarget?: number;
  msdyn_GetHandoverDetailsInfo?: string;
}

/**
 * msdyn_SalesAgents_HandoverInitiate request message
 *
 * Web API Action: msdyn_SalesAgents_HandoverInitiate
 */
export class msdyn_SalesAgents_HandoverInitiateRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_HandoverInitiateResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_HandoverInitiateRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_HandoverInitiateRequestParameters) {
    super("msdyn_SalesAgents_HandoverInitiate", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_HandoverInitiate`;

    const body = requestBody({
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_HandoverIntent: this.Parameters.msdyn_HandoverIntent,
      msdyn_AssignTo: this.Parameters.msdyn_AssignTo,
      msdyn_SalesAgentRun: this.Parameters.msdyn_SalesAgentRun,
      msdyn_HandoverTarget: this.Parameters.msdyn_HandoverTarget,
      msdyn_GetHandoverDetailsInfo: this.Parameters.msdyn_GetHandoverDetailsInfo,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_HandoverInitiateResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_HandoverInitiateResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAgents_HandoverInitiate action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_HandoverInitiateResult {
  "@odata.context"?: string;
  HandoverInitiateResponse: string;
}

/**
 * msdyn_SalesAgents_HandoverInitiate response message
 *
 * `result` is the value the msdyn_SalesAgents_HandoverInitiate action returns (see {@link msdyn_SalesAgents_HandoverInitiateResult}).
 */
export class msdyn_SalesAgents_HandoverInitiateResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_HandoverInitiateResult) {
    super("msdyn_SalesAgents_HandoverInitiate");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_HandoverInitiateResponse {
    return new msdyn_SalesAgents_HandoverInitiateResponse(
      data as msdyn_SalesAgents_HandoverInitiateResult
    );
  }
}
