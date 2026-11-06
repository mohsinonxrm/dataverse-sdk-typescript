import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_simulationratelimiterResponse as msdyn_simulationratelimiterResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_simulationratelimiterResponse.fromResponse({});
    return msdyn_simulationratelimiterResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_simulationratelimiter response message
 */
export class msdyn_simulationratelimiterResponse extends OrganizationResponse {
  constructor(public result: msdyn_simulationratelimiterResponseData) {
    super("msdyn_simulationratelimiter");
  }

  static fromResponse(data: unknown): msdyn_simulationratelimiterResponse {
    return new msdyn_simulationratelimiterResponse(
      responseObject<msdyn_simulationratelimiterResponseData>(data)
    );
  }
}
