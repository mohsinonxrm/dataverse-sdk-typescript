import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_conversationclosecasesentiment action
 */
export interface msdyn_conversationclosecasesentimentResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_conversationclosecasesentiment action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_conversationclosecasesentimentActionParameters {
  LiveWorkItemGuid: string;
}

/**
 * msdyn_conversationclosecasesentiment action
 *
 * Unbound action
 */
export class msdyn_conversationclosecasesentimentAction implements Executable<msdyn_conversationclosecasesentimentResponse> {
  constructor(public readonly parameters: msdyn_conversationclosecasesentimentActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_conversationclosecasesentiment`;

    const body = requestBody({
      LiveWorkItemGuid: this.parameters.LiveWorkItemGuid,
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

  async parseResponse(response: Response): Promise<msdyn_conversationclosecasesentimentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_conversationclosecasesentimentResponse;
    return (await response.json()) as msdyn_conversationclosecasesentimentResponse;
  }
}
