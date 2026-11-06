import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_HandoverNotifySingleResponse as msdyn_SalesAgents_HandoverNotifySingleResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAgents_HandoverNotifySingle message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_HandoverNotifySingleRequestParameters {
  msdyn_SalesAgentRun: string;
  msdyn_TrackingId?: string;
  msdyn_HandoverContext?: string;
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
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_HandoverContext: this.Parameters.msdyn_HandoverContext,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SalesAgents_HandoverNotifySingleResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_SalesAgents_HandoverNotifySingle response message
 */
export class msdyn_SalesAgents_HandoverNotifySingleResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_HandoverNotifySingleResponseData) {
    super("msdyn_SalesAgents_HandoverNotifySingle");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_HandoverNotifySingleResponse {
    return new msdyn_SalesAgents_HandoverNotifySingleResponse(
      responseObject<msdyn_SalesAgents_HandoverNotifySingleResponseData>(data)
    );
  }
}
