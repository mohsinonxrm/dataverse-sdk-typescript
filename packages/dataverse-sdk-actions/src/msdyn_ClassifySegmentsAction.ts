import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ClassifySegments action
 */
export interface msdyn_ClassifySegmentsResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_ClassifySegments action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ClassifySegmentsActionParameters {
  RegardingEntityId?: string;
  RegardingEntityName?: string;
}

/**
 * msdyn_ClassifySegments action
 *
 * Unbound action
 */
export class msdyn_ClassifySegmentsAction implements Executable<msdyn_ClassifySegmentsResponse> {
  constructor(public readonly parameters: msdyn_ClassifySegmentsActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ClassifySegments`;

    const body = requestBody({
      RegardingEntityId: this.parameters.RegardingEntityId,
      RegardingEntityName: this.parameters.RegardingEntityName,
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

  async parseResponse(response: Response): Promise<msdyn_ClassifySegmentsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_ClassifySegmentsResponse;
  }
}
