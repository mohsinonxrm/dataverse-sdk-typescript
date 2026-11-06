import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CaseClassification action
 */
export interface msdyn_CaseClassificationResponse {
  Response4: string;
}

/**
 * Parameters of the msdyn_CaseClassification action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CaseClassificationActionParameters {
  CSCopilotRequest4: string;
}

/**
 * msdyn_CaseClassification action
 *
 * Unbound action
 */
export class msdyn_CaseClassificationAction implements Executable<msdyn_CaseClassificationResponse> {
  constructor(public readonly parameters: msdyn_CaseClassificationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CaseClassification`;

    const body = requestBody({
      CSCopilotRequest4: this.parameters.CSCopilotRequest4,
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

  async parseResponse(response: Response): Promise<msdyn_CaseClassificationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CaseClassificationResponse;
    return (await response.json()) as msdyn_CaseClassificationResponse;
  }
}
