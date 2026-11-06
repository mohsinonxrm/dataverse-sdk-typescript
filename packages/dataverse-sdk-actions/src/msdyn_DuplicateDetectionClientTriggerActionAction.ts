import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_DuplicateDetectionClientTriggerAction action
 */
export interface msdyn_DuplicateDetectionClientTriggerActionResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_DuplicateDetectionClientTriggerAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DuplicateDetectionClientTriggerActionActionParameters {
  InputData?: string;
}

/**
 * msdyn_DuplicateDetectionClientTriggerAction action
 *
 * Unbound action
 */
export class msdyn_DuplicateDetectionClientTriggerActionAction implements Executable<msdyn_DuplicateDetectionClientTriggerActionResponse> {
  constructor(
    public readonly parameters: msdyn_DuplicateDetectionClientTriggerActionActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DuplicateDetectionClientTriggerAction`;

    const body = requestBody({
      InputData: this.parameters.InputData,
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
  ): Promise<msdyn_DuplicateDetectionClientTriggerActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_DuplicateDetectionClientTriggerActionResponse;
    return (await response.json()) as msdyn_DuplicateDetectionClientTriggerActionResponse;
  }
}
