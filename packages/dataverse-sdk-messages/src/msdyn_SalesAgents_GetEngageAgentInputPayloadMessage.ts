import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_GetEngageAgentInputPayload message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_GetEngageAgentInputPayloadRequestParameters {
  msdyn_SalesAgentRun?: string;
  msdyn_SalesMacroAgentType: number;
  msdyn_TrackingId?: string;
  msdyn_Thread?: string;
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
      msdyn_SalesAgentRun: this.Parameters.msdyn_SalesAgentRun,
      msdyn_SalesMacroAgentType: this.Parameters.msdyn_SalesMacroAgentType,
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_Thread: this.Parameters.msdyn_Thread,
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
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_GetEngageAgentInputPayloadResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAgents_GetEngageAgentInputPayload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_GetEngageAgentInputPayloadResult {
  "@odata.context"?: string;
  msdyn_EngageAgentInput: string;
  msdyn_Thread: string;
}

/**
 * msdyn_SalesAgents_GetEngageAgentInputPayload response message
 *
 * `result` is the value the msdyn_SalesAgents_GetEngageAgentInputPayload action returns (see {@link msdyn_SalesAgents_GetEngageAgentInputPayloadResult}).
 */
export class msdyn_SalesAgents_GetEngageAgentInputPayloadResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetEngageAgentInputPayloadResult) {
    super("msdyn_SalesAgents_GetEngageAgentInputPayload");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_GetEngageAgentInputPayloadResponse {
    return new msdyn_SalesAgents_GetEngageAgentInputPayloadResponse(
      data as msdyn_SalesAgents_GetEngageAgentInputPayloadResult
    );
  }
}
