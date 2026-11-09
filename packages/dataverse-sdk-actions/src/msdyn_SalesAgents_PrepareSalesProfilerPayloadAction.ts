import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesAgents_PrepareSalesProfilerPayload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_PrepareSalesProfilerPayloadResponse {
  "@odata.context"?: string;
  msdyn_IsSuccess: boolean;
  msdyn_Payload: string;
}

/**
 * Parameters of the msdyn_SalesAgents_PrepareSalesProfilerPayload action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_PrepareSalesProfilerPayloadActionParameters {
  msdyn_SalesAgentRunId: string;
}

/**
 * msdyn_SalesAgents_PrepareSalesProfilerPayload action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_PrepareSalesProfilerPayloadAction implements Executable<msdyn_SalesAgents_PrepareSalesProfilerPayloadResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_PrepareSalesProfilerPayloadActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_PrepareSalesProfilerPayload`;

    const body = requestBody({
      msdyn_SalesAgentRunId: this.parameters.msdyn_SalesAgentRunId,
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
    return (await response.json()) as msdyn_SalesAgents_PrepareSalesProfilerPayloadResponse;
  }
}
