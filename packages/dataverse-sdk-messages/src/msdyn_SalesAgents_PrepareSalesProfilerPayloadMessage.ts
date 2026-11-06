import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_PrepareSalesProfilerPayload message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_PrepareSalesProfilerPayloadRequestParameters {
  msdyn_SalesAgentRunId: string;
}

/**
 * msdyn_SalesAgents_PrepareSalesProfilerPayload request message
 *
 * Web API Action: msdyn_SalesAgents_PrepareSalesProfilerPayload
 */
export class msdyn_SalesAgents_PrepareSalesProfilerPayloadRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_PrepareSalesProfilerPayloadResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_PrepareSalesProfilerPayloadRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_PrepareSalesProfilerPayloadRequestParameters) {
    super("msdyn_SalesAgents_PrepareSalesProfilerPayload", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_PrepareSalesProfilerPayload`;

    const body = requestBody({
      msdyn_SalesAgentRunId: this.Parameters.msdyn_SalesAgentRunId,
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
  ): Promise<msdyn_SalesAgents_PrepareSalesProfilerPayloadResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_PrepareSalesProfilerPayloadResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesAgents_PrepareSalesProfilerPayload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_PrepareSalesProfilerPayloadResult {
  "@odata.context"?: string;
  msdyn_IsSuccess: boolean;
  msdyn_Payload: string;
}

/**
 * msdyn_SalesAgents_PrepareSalesProfilerPayload response message
 *
 * `result` is the value the msdyn_SalesAgents_PrepareSalesProfilerPayload action returns (see {@link msdyn_SalesAgents_PrepareSalesProfilerPayloadResult}).
 */
export class msdyn_SalesAgents_PrepareSalesProfilerPayloadResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_PrepareSalesProfilerPayloadResult) {
    super("msdyn_SalesAgents_PrepareSalesProfilerPayload");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_PrepareSalesProfilerPayloadResponse {
    return new msdyn_SalesAgents_PrepareSalesProfilerPayloadResponse(
      data as msdyn_SalesAgents_PrepareSalesProfilerPayloadResult
    );
  }
}
