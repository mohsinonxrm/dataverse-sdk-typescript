import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_HandoverNotifySingle message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_HandoverNotifySingleRequestParameters {
  msdyn_SalesAgentRun: string;
  msdyn_HandoverContext?: string;
  msdyn_TrackingId?: string;
}

/**
 * msdyn_SalesAgents_HandoverNotifySingle request message
 *
 * Web API Action: msdyn_SalesAgents_HandoverNotifySingle
 */
export class msdyn_SalesAgents_HandoverNotifySingleRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_HandoverNotifySingleResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_HandoverNotifySingleRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_HandoverNotifySingleRequestParameters) {
    super("msdyn_SalesAgents_HandoverNotifySingle", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_HandoverNotifySingle`;

    const body = requestBody({
      msdyn_SalesAgentRun: this.Parameters.msdyn_SalesAgentRun,
      msdyn_HandoverContext: this.Parameters.msdyn_HandoverContext,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_HandoverNotifySingleResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_HandoverNotifySingleResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAgents_HandoverNotifySingle action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_HandoverNotifySingleResult {
  "@odata.context"?: string;
  ResponseJson: string;
}

/**
 * msdyn_SalesAgents_HandoverNotifySingle response message
 *
 * `result` is the value the msdyn_SalesAgents_HandoverNotifySingle action returns (see {@link msdyn_SalesAgents_HandoverNotifySingleResult}).
 */
export class msdyn_SalesAgents_HandoverNotifySingleResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_HandoverNotifySingleResult) {
    super("msdyn_SalesAgents_HandoverNotifySingle");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_HandoverNotifySingleResponse {
    return new msdyn_SalesAgents_HandoverNotifySingleResponse(
      data as msdyn_SalesAgents_HandoverNotifySingleResult
    );
  }
}
