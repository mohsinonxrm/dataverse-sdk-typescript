import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_draftCefInsight action
 */
export interface msdyn_draftCefInsightResponse {
  msdyn_jobId: string;
  msdyn_responseStatus: string;
}

/**
 * Parameters of the msdyn_draftCefInsight action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_draftCefInsightActionParameters {
  msdyn_chatId: string;
  msdyn_insightId?: string;
  msdyn_insightinfo?: string;
  msdyn_requestOptions?: string;
  msdyn_requestId: string;
  msdyn_entityLogicalName?: string;
  msdyn_entityId?: string;
  msdyn_message: string;
}

/**
 * msdyn_draftCefInsight action
 *
 * Unbound action
 */
export class msdyn_draftCefInsightAction implements Executable<msdyn_draftCefInsightResponse> {
  constructor(public readonly parameters: msdyn_draftCefInsightActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_draftCefInsight`;

    const body = requestBody({
      msdyn_chatId: this.parameters.msdyn_chatId,
      msdyn_insightId: this.parameters.msdyn_insightId,
      msdyn_insightinfo: this.parameters.msdyn_insightinfo,
      msdyn_requestOptions: this.parameters.msdyn_requestOptions,
      msdyn_requestId: this.parameters.msdyn_requestId,
      msdyn_entityLogicalName: this.parameters.msdyn_entityLogicalName,
      msdyn_entityId: this.parameters.msdyn_entityId,
      msdyn_message: this.parameters.msdyn_message,
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

  async parseResponse(response: Response): Promise<msdyn_draftCefInsightResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_draftCefInsightResponse;
    return (await response.json()) as msdyn_draftCefInsightResponse;
  }
}
