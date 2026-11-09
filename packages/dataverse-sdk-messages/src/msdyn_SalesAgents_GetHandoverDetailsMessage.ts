import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_GetHandoverDetails message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_GetHandoverDetailsRequestParameters {
  msdyn_SalesAgentRun: string;
  msdyn_TrackingId?: string;
}

/**
 * msdyn_SalesAgents_GetHandoverDetails request message
 *
 * Web API Action: msdyn_SalesAgents_GetHandoverDetails
 */
export class msdyn_SalesAgents_GetHandoverDetailsRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_GetHandoverDetailsResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_GetHandoverDetailsRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_GetHandoverDetailsRequestParameters) {
    super("msdyn_SalesAgents_GetHandoverDetails", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetHandoverDetails`;

    const body = requestBody({
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_GetHandoverDetailsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_GetHandoverDetailsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAgents_GetHandoverDetails action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_GetHandoverDetailsResult {
  "@odata.context"?: string;
  GetHandoverDetailsResponse: string;
}

/**
 * msdyn_SalesAgents_GetHandoverDetails response message
 *
 * `result` is the value the msdyn_SalesAgents_GetHandoverDetails action returns (see {@link msdyn_SalesAgents_GetHandoverDetailsResult}).
 */
export class msdyn_SalesAgents_GetHandoverDetailsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetHandoverDetailsResult) {
    super("msdyn_SalesAgents_GetHandoverDetails");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_GetHandoverDetailsResponse {
    return new msdyn_SalesAgents_GetHandoverDetailsResponse(
      data as msdyn_SalesAgents_GetHandoverDetailsResult
    );
  }
}
