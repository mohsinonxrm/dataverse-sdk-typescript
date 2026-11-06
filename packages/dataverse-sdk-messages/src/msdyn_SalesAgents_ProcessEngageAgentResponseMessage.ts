import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_ProcessEngageAgentResponseResponse as msdyn_SalesAgents_ProcessEngageAgentResponseResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAgents_ProcessEngageAgentResponse message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_ProcessEngageAgentResponseRequestParameters {
  msdyn_Thread?: string;
  msdyn_TrackingId?: string;
  msdyn_SalesMacroAgentType: number;
  msdyn_SalesAgentRun?: string;
  msdyn_EngageAgentActivities: string;
}

/**
 * msdyn_SalesAgents_ProcessEngageAgentResponse request message
 *
 * Web API Action: msdyn_SalesAgents_ProcessEngageAgentResponse
 */
export class msdyn_SalesAgents_ProcessEngageAgentResponseRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_ProcessEngageAgentResponseResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_ProcessEngageAgentResponseRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_ProcessEngageAgentResponseRequestParameters) {
    super("msdyn_SalesAgents_ProcessEngageAgentResponse", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ProcessEngageAgentResponse`;

    const body = requestBody({
      msdyn_Thread: this.Parameters.msdyn_Thread,
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_SalesMacroAgentType: this.Parameters.msdyn_SalesMacroAgentType,
      msdyn_SalesAgentRun: this.Parameters.msdyn_SalesAgentRun,
      msdyn_EngageAgentActivities: this.Parameters.msdyn_EngageAgentActivities,
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
  ): Promise<msdyn_SalesAgents_ProcessEngageAgentResponseResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SalesAgents_ProcessEngageAgentResponseResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_SalesAgents_ProcessEngageAgentResponse response message
 */
export class msdyn_SalesAgents_ProcessEngageAgentResponseResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_ProcessEngageAgentResponseResponseData) {
    super("msdyn_SalesAgents_ProcessEngageAgentResponse");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_ProcessEngageAgentResponseResponse {
    return new msdyn_SalesAgents_ProcessEngageAgentResponseResponse(
      responseObject<msdyn_SalesAgents_ProcessEngageAgentResponseResponseData>(data)
    );
  }
}
