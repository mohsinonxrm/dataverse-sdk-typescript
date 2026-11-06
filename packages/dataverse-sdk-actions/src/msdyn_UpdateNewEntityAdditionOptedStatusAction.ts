import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_UpdateNewEntityAdditionOptedStatus action
 */
export interface msdyn_UpdateNewEntityAdditionOptedStatusResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_UpdateNewEntityAdditionOptedStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateNewEntityAdditionOptedStatusActionParameters {
  PredictionName: string;
  PredictionType: string;
  IsNewEntityAdditionOpted: boolean;
}

/**
 * msdyn_UpdateNewEntityAdditionOptedStatus action
 *
 * Unbound action
 */
export class msdyn_UpdateNewEntityAdditionOptedStatusAction implements Executable<msdyn_UpdateNewEntityAdditionOptedStatusResponse> {
  constructor(
    public readonly parameters: msdyn_UpdateNewEntityAdditionOptedStatusActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateNewEntityAdditionOptedStatus`;

    const body = requestBody({
      PredictionName: this.parameters.PredictionName,
      PredictionType: this.parameters.PredictionType,
      IsNewEntityAdditionOpted: this.parameters.IsNewEntityAdditionOpted,
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
  ): Promise<msdyn_UpdateNewEntityAdditionOptedStatusResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_UpdateNewEntityAdditionOptedStatusResponse;
  }
}
