import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_UpdateSurveyJson action
 */
export interface msdyn_UpdateSurveyJsonResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_UpdateSurveyJson action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateSurveyJsonActionParameters {
  inspectionDefinitionId: string;
  newInspectionJson: string;
}

/**
 * msdyn_UpdateSurveyJson action
 *
 * Unbound action
 */
export class msdyn_UpdateSurveyJsonAction implements Executable<msdyn_UpdateSurveyJsonResponse> {
  constructor(public readonly parameters: msdyn_UpdateSurveyJsonActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateSurveyJson`;

    const body = requestBody({
      inspectionDefinitionId: this.parameters.inspectionDefinitionId,
      newInspectionJson: this.parameters.newInspectionJson,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateSurveyJsonResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_UpdateSurveyJsonResponse;
    return (await response.json()) as msdyn_UpdateSurveyJsonResponse;
  }
}
