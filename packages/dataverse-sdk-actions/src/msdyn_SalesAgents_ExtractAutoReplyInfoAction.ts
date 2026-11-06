import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesAgents_ExtractAutoReplyInfo action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_ExtractAutoReplyInfoResponse {
  "@odata.context"?: string;
  msdyn_AutoReplyInfo: string;
}

/**
 * Parameters of the msdyn_SalesAgents_ExtractAutoReplyInfo action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_ExtractAutoReplyInfoActionParameters {
  msdyn_SalesAgentRun?: string;
  msdyn_TrackingId?: string;
  msdyn_AuthType?: number;
  msdyn_Thread?: string;
  msdyn_SalesMacroAgentType: number;
}

/**
 * msdyn_SalesAgents_ExtractAutoReplyInfo action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_ExtractAutoReplyInfoAction implements Executable<msdyn_SalesAgents_ExtractAutoReplyInfoResponse> {
  constructor(public readonly parameters: msdyn_SalesAgents_ExtractAutoReplyInfoActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ExtractAutoReplyInfo`;

    const body = requestBody({
      msdyn_SalesAgentRun: this.parameters.msdyn_SalesAgentRun,
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
      msdyn_AuthType: this.parameters.msdyn_AuthType,
      msdyn_Thread: this.parameters.msdyn_Thread,
      msdyn_SalesMacroAgentType: this.parameters.msdyn_SalesMacroAgentType,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_ExtractAutoReplyInfoResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesAgents_ExtractAutoReplyInfoResponse;
  }
}
