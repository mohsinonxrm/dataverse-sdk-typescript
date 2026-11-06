import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_getSalesSequenceExperimentVersion action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_getSalesSequenceExperimentVersionResponse {
  "@odata.context"?: string;
  msdyn_experimentVersionResponse: string;
}

/**
 * Parameters of the msdyn_getSalesSequenceExperimentVersion action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_getSalesSequenceExperimentVersionActionParameters {
  msdyn_customerId: string;
  msdyn_experimentKey: string;
  msdyn_versionATraffic: number;
  msdyn_experimentVersionRecordId: string;
}

/**
 * msdyn_getSalesSequenceExperimentVersion action
 *
 * Unbound action
 */
export class msdyn_getSalesSequenceExperimentVersionAction implements Executable<msdyn_getSalesSequenceExperimentVersionResponse> {
  constructor(
    public readonly parameters: msdyn_getSalesSequenceExperimentVersionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getSalesSequenceExperimentVersion`;

    const body = requestBody({
      msdyn_customerId: this.parameters.msdyn_customerId,
      msdyn_experimentKey: this.parameters.msdyn_experimentKey,
      msdyn_versionATraffic: this.parameters.msdyn_versionATraffic,
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
  ): Promise<msdyn_getSalesSequenceExperimentVersionResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_getSalesSequenceExperimentVersionResponse;
  }
}
