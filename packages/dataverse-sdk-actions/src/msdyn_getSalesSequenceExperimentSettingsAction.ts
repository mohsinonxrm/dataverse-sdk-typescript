import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_getSalesSequenceExperimentSettings action
 */
export interface msdyn_getSalesSequenceExperimentSettingsResponse {
  msdyn_experimentSettingsResponse: string;
}

/**
 * Parameters of the msdyn_getSalesSequenceExperimentSettings action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_getSalesSequenceExperimentSettingsActionParameters {
  msdyn_experimentRecordId?: string;
  msdyn_experimentKey: string;
  msdyn_experimentVersionRecordId: string;
}

/**
 * msdyn_getSalesSequenceExperimentSettings action
 *
 * Unbound action
 */
export class msdyn_getSalesSequenceExperimentSettingsAction implements Executable<msdyn_getSalesSequenceExperimentSettingsResponse> {
  constructor(
    public readonly parameters: msdyn_getSalesSequenceExperimentSettingsActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getSalesSequenceExperimentSettings`;

    const body = requestBody({
      msdyn_experimentRecordId: this.parameters.msdyn_experimentRecordId,
      msdyn_experimentKey: this.parameters.msdyn_experimentKey,
      msdyn_experimentVersionRecordId: this.parameters.msdyn_experimentVersionRecordId,
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
  ): Promise<msdyn_getSalesSequenceExperimentSettingsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_getSalesSequenceExperimentSettingsResponse;
  }
}
