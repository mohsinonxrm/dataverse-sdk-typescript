import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAgents_ExtractAutoReplyInfo action
 */
export interface msdyn_SalesAgents_ExtractAutoReplyInfoResponse {
  msdyn_AutoReplyInfo: string;
}

/**
 * Parameters of the msdyn_SalesAgents_ExtractAutoReplyInfo action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_ExtractAutoReplyInfoActionParameters {
  msdyn_TrackingId?: string;
  msdyn_SalesAgentRun?: string;
  msdyn_AuthType?: number;
  msdyn_SalesMacroAgentType: number;
  msdyn_Thread?: string;
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
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
      msdyn_SalesAgentRun: this.parameters.msdyn_SalesAgentRun,
      msdyn_AuthType: this.parameters.msdyn_AuthType,
      msdyn_SalesMacroAgentType: this.parameters.msdyn_SalesMacroAgentType,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_ExtractAutoReplyInfoResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_SalesAgents_ExtractAutoReplyInfoResponse;
  }
}
