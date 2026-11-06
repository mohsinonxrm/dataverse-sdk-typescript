import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_getSalesSequenceExperimentSettings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_getSalesSequenceExperimentSettingsResponse {
  "@odata.context"?: string;
  msdyn_experimentSettingsResponse: string;
}

/**
 * Parameters of the msdyn_getSalesSequenceExperimentSettings action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_getSalesSequenceExperimentSettingsActionParameters {
  msdyn_experimentKey: string;
  msdyn_experimentVersionRecordId: string;
  msdyn_experimentRecordId?: string;
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
      msdyn_experimentKey: this.parameters.msdyn_experimentKey,
      msdyn_experimentVersionRecordId: this.parameters.msdyn_experimentVersionRecordId,
      msdyn_experimentRecordId: this.parameters.msdyn_experimentRecordId,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_getSalesSequenceExperimentSettingsResponse;
  }
}
