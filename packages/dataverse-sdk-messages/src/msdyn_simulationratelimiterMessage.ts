import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_simulationratelimiter message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_simulationratelimiterRequestParameters {
  ConversationCount: number;
}

/**
 * msdyn_simulationratelimiter request message
 *
 * Web API Action: msdyn_simulationratelimiter
 */
export class msdyn_simulationratelimiterRequest
  extends OrganizationRequest
  implements Executable<msdyn_simulationratelimiterResponse>
{
  declare readonly Parameters: Readonly<msdyn_simulationratelimiterRequestParameters>;

  constructor(parameters: msdyn_simulationratelimiterRequestParameters) {
    super("msdyn_simulationratelimiter", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_simulationratelimiter`;

    const body = requestBody({
      ConversationCount: this.Parameters.ConversationCount,
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

  async parseResponse(response: Response): Promise<msdyn_simulationratelimiterResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_simulationratelimiterResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_simulationratelimiter action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_simulationratelimiterResult {
  "@odata.context"?: string;
  message: string;
  statuscode: number;
}

/**
 * msdyn_simulationratelimiter response message
 *
 * `result` is the value the msdyn_simulationratelimiter action returns (see {@link msdyn_simulationratelimiterResult}).
 */
export class msdyn_simulationratelimiterResponse extends OrganizationResponse {
  constructor(public result: msdyn_simulationratelimiterResult) {
    super("msdyn_simulationratelimiter");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_simulationratelimiterResponse {
    return new msdyn_simulationratelimiterResponse(data as msdyn_simulationratelimiterResult);
  }
}
