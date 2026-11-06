import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_executeCEFInsights action
 */
export interface msdyn_executeCEFInsightsResponse {
  msdyn_responsePayload: string;
  msdyn_responseStatus: string;
}

/**
 * Parameters of the msdyn_executeCEFInsights action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_executeCEFInsightsActionParameters {
  msdyn_entityId?: string;
  msdyn_insightRetrievalMode?: string;
  msdyn_requestId?: string;
  msdyn_resultPreference?: string;
  msdyn_insightIdsJson?: string;
  msdyn_requestOptions?: string;
  msdyn_entityLogicalName?: string;
}

/**
 * msdyn_executeCEFInsights action
 *
 * Unbound action
 */
export class msdyn_executeCEFInsightsAction implements Executable<msdyn_executeCEFInsightsResponse> {
  constructor(public readonly parameters: msdyn_executeCEFInsightsActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_executeCEFInsights`;

    const body = requestBody({
      msdyn_entityId: this.parameters.msdyn_entityId,
      msdyn_insightRetrievalMode: this.parameters.msdyn_insightRetrievalMode,
      msdyn_requestId: this.parameters.msdyn_requestId,
      msdyn_resultPreference: this.parameters.msdyn_resultPreference,
      msdyn_insightIdsJson: this.parameters.msdyn_insightIdsJson,
      msdyn_requestOptions: this.parameters.msdyn_requestOptions,
      msdyn_entityLogicalName: this.parameters.msdyn_entityLogicalName,
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

  async parseResponse(response: Response): Promise<msdyn_executeCEFInsightsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_executeCEFInsightsResponse;
    return (await response.json()) as msdyn_executeCEFInsightsResponse;
  }
}
