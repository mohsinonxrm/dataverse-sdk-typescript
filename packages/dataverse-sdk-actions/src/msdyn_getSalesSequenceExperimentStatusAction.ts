import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_getSalesSequenceExperimentStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_getSalesSequenceExperimentStatusResponse {
  "@odata.context"?: string;
  msdyn_ExperimentStatusResponse: string;
}

/**
 * Parameters of the msdyn_getSalesSequenceExperimentStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_getSalesSequenceExperimentStatusActionParameters {
  msdyn_experimentKey: string;
  msdyn_experimentVersionRecordId: string;
}

/**
 * msdyn_getSalesSequenceExperimentStatus action
 *
 * Unbound action
 */
export class msdyn_getSalesSequenceExperimentStatusAction implements Executable<msdyn_getSalesSequenceExperimentStatusResponse> {
  constructor(public readonly parameters: msdyn_getSalesSequenceExperimentStatusActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getSalesSequenceExperimentStatus`;

    const body = requestBody({
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

  async parseResponse(response: Response): Promise<msdyn_getSalesSequenceExperimentStatusResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_getSalesSequenceExperimentStatusResponse;
  }
}
