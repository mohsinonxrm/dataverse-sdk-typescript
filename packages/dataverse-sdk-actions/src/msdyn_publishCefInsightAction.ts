import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_publishCefInsight action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_publishCefInsightResponse {
  "@odata.context"?: string;
  msdyn_responseStatus: string;
}

/**
 * Parameters of the msdyn_publishCefInsight action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_publishCefInsightActionParameters {
  msdyn_entityLogicalName?: string;
  msdyn_cefinsightid: string;
  msdyn_requestOptions?: string;
  msdyn_chatId: string;
  msdyn_entityId?: string;
  msdyn_insightinfo?: string;
  msdyn_requestId: string;
  msdyn_insightId?: string;
}

/**
 * msdyn_publishCefInsight action
 *
 * Unbound action
 */
export class msdyn_publishCefInsightAction implements Executable<msdyn_publishCefInsightResponse> {
  constructor(public readonly parameters: msdyn_publishCefInsightActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_publishCefInsight`;

    const body = requestBody({
      msdyn_entityLogicalName: this.parameters.msdyn_entityLogicalName,
      msdyn_cefinsightid: this.parameters.msdyn_cefinsightid,
      msdyn_requestOptions: this.parameters.msdyn_requestOptions,
      msdyn_chatId: this.parameters.msdyn_chatId,
      msdyn_entityId: this.parameters.msdyn_entityId,
      msdyn_insightinfo: this.parameters.msdyn_insightinfo,
      msdyn_requestId: this.parameters.msdyn_requestId,
      msdyn_insightId: this.parameters.msdyn_insightId,
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

  async parseResponse(response: Response): Promise<msdyn_publishCefInsightResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_publishCefInsightResponse;
  }
}
