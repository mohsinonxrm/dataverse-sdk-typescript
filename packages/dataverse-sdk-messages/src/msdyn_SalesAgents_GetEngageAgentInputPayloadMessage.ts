import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_GetEngageAgentInputPayloadResponse as msdyn_SalesAgents_GetEngageAgentInputPayloadResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAgents_GetEngageAgentInputPayload message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_GetEngageAgentInputPayloadRequestParameters {
  msdyn_Thread?: string;
  msdyn_SalesAgentRun?: string;
  msdyn_SalesMacroAgentType: number;
  msdyn_TrackingId?: string;
}

/**
 * msdyn_SalesAgents_GetEngageAgentInputPayload request message
 *
 * Web API Action: msdyn_SalesAgents_GetEngageAgentInputPayload
 */
export class msdyn_SalesAgents_GetEngageAgentInputPayloadRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_GetEngageAgentInputPayloadResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_GetEngageAgentInputPayloadRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_GetEngageAgentInputPayloadRequestParameters) {
    super("msdyn_SalesAgents_GetEngageAgentInputPayload", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetEngageAgentInputPayload`;

    const body = requestBody({
      msdyn_Thread: this.Parameters.msdyn_Thread,
      msdyn_SalesAgentRun: this.Parameters.msdyn_SalesAgentRun,
      msdyn_SalesMacroAgentType: this.Parameters.msdyn_SalesMacroAgentType,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_GetEngageAgentInputPayloadResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesAgents_GetEngageAgentInputPayloadResponse.fromResponse({});
    return msdyn_SalesAgents_GetEngageAgentInputPayloadResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SalesAgents_GetEngageAgentInputPayload response message
 */
export class msdyn_SalesAgents_GetEngageAgentInputPayloadResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetEngageAgentInputPayloadResponseData) {
    super("msdyn_SalesAgents_GetEngageAgentInputPayload");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_GetEngageAgentInputPayloadResponse {
    return new msdyn_SalesAgents_GetEngageAgentInputPayloadResponse(
      responseObject<msdyn_SalesAgents_GetEngageAgentInputPayloadResponseData>(data)
    );
  }
}
