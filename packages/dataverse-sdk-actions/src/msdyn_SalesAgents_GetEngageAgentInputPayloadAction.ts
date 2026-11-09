import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesAgents_GetEngageAgentInputPayload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_GetEngageAgentInputPayloadResponse {
  "@odata.context"?: string;
  msdyn_EngageAgentInput: string;
  msdyn_Thread: string;
}

/**
 * Parameters of the msdyn_SalesAgents_GetEngageAgentInputPayload action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_GetEngageAgentInputPayloadActionParameters {
  msdyn_SalesAgentRun?: string;
  msdyn_SalesMacroAgentType: number;
  msdyn_TrackingId?: string;
  msdyn_Thread?: string;
}

/**
 * msdyn_SalesAgents_GetEngageAgentInputPayload action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_GetEngageAgentInputPayloadAction implements Executable<msdyn_SalesAgents_GetEngageAgentInputPayloadResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_GetEngageAgentInputPayloadActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetEngageAgentInputPayload`;

    const body = requestBody({
      msdyn_SalesAgentRun: this.parameters.msdyn_SalesAgentRun,
      msdyn_SalesMacroAgentType: this.parameters.msdyn_SalesMacroAgentType,
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
      msdyn_Thread: this.parameters.msdyn_Thread,
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
    return (await response.json()) as msdyn_SalesAgents_GetEngageAgentInputPayloadResponse;
  }
}
