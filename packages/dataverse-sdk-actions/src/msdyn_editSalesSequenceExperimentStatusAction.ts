import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_editSalesSequenceExperimentStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_editSalesSequenceExperimentStatusResponse {
  "@odata.context"?: string;
  msdyn_editExperimentStatusResponse: string;
}

/**
 * Parameters of the msdyn_editSalesSequenceExperimentStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_editSalesSequenceExperimentStatusActionParameters {
  msdyn_experimentVersionRecordId: string;
  msdyn_isDeactivated?: boolean;
  msdyn_expiryTime?: string;
  msdyn_experimentKey: string;
  msdyn_winnerOrDefault: string;
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
      msdyn_experimentVersionRecordId: this.parameters.msdyn_experimentVersionRecordId,
      msdyn_isDeactivated: this.parameters.msdyn_isDeactivated,
      msdyn_expiryTime: this.parameters.msdyn_expiryTime,
      msdyn_experimentKey: this.parameters.msdyn_experimentKey,
      msdyn_winnerOrDefault: this.parameters.msdyn_winnerOrDefault,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_editSalesSequenceExperimentStatusResponse;
  }
}
