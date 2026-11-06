import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_editSalesSequenceExperimentStatus action
 */
export interface msdyn_editSalesSequenceExperimentStatusResponse {
  msdyn_editExperimentStatusResponse: string;
}

/**
 * Parameters of the msdyn_editSalesSequenceExperimentStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_editSalesSequenceExperimentStatusActionParameters {
  msdyn_winnerOrDefault: string;
  msdyn_experimentKey: string;
  msdyn_expiryTime?: string;
  msdyn_isDeactivated?: boolean;
  msdyn_experimentVersionRecordId: string;
}

/**
 * msdyn_editSalesSequenceExperimentStatus action
 *
 * Unbound action
 */
export class msdyn_editSalesSequenceExperimentStatusAction implements Executable<msdyn_editSalesSequenceExperimentStatusResponse> {
  constructor(
    public readonly parameters: msdyn_editSalesSequenceExperimentStatusActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_editSalesSequenceExperimentStatus`;

    const body = requestBody({
      msdyn_winnerOrDefault: this.parameters.msdyn_winnerOrDefault,
      msdyn_experimentKey: this.parameters.msdyn_experimentKey,
      msdyn_expiryTime: this.parameters.msdyn_expiryTime,
      msdyn_isDeactivated: this.parameters.msdyn_isDeactivated,
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
  ): Promise<msdyn_editSalesSequenceExperimentStatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_editSalesSequenceExperimentStatusResponse;
    return (await response.json()) as msdyn_editSalesSequenceExperimentStatusResponse;
  }
}
