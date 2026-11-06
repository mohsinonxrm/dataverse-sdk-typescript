import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_HandoverInitiateResponse as msdyn_SalesAgents_HandoverInitiateResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAgents_HandoverInitiate message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_HandoverInitiateRequestParameters {
  msdyn_AssignTo?: number;
  msdyn_HandoverIntent?: number;
  msdyn_GetHandoverDetailsInfo?: string;
  msdyn_SalesAgentRun: string;
  msdyn_HandoverTarget?: number;
  msdyn_TrackingId?: string;
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
      msdyn_AssignTo: this.Parameters.msdyn_AssignTo,
      msdyn_HandoverIntent: this.Parameters.msdyn_HandoverIntent,
      msdyn_GetHandoverDetailsInfo: this.Parameters.msdyn_GetHandoverDetailsInfo,
      msdyn_SalesAgentRun: this.Parameters.msdyn_SalesAgentRun,
      msdyn_HandoverTarget: this.Parameters.msdyn_HandoverTarget,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_HandoverInitiateResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SalesAgents_HandoverInitiateResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_SalesAgents_HandoverInitiate response message
 */
export class msdyn_SalesAgents_HandoverInitiateResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_HandoverInitiateResponseData) {
    super("msdyn_SalesAgents_HandoverInitiate");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_HandoverInitiateResponse {
    return new msdyn_SalesAgents_HandoverInitiateResponse(
      responseObject<msdyn_SalesAgents_HandoverInitiateResponseData>(data)
    );
  }
}
