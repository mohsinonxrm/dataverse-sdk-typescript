import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_getSalesSequenceExperimentVersion action
 */
export interface msdyn_getSalesSequenceExperimentVersionResponse {
  msdyn_experimentVersionResponse: string;
}

/**
 * Parameters of the msdyn_getSalesSequenceExperimentVersion action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_getSalesSequenceExperimentVersionActionParameters {
  msdyn_experimentKey: string;
  msdyn_customerId: string;
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
      msdyn_experimentKey: this.parameters.msdyn_experimentKey,
      msdyn_customerId: this.parameters.msdyn_customerId,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_getSalesSequenceExperimentVersionResponse;
  }
}
