import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetBookableResources action
 */
export interface msdyn_GetBookableResourcesResponse {
  BookableResources: string;
}

/**
 * Parameters of the msdyn_GetBookableResources action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetBookableResourcesActionParameters {
  Resources: string;
}

/**
 * msdyn_GetBookableResources action
 *
 * Unbound action
 */
export class msdyn_GetBookableResourcesAction implements Executable<msdyn_GetBookableResourcesResponse> {
  constructor(public readonly parameters: msdyn_GetBookableResourcesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetBookableResources`;

    const body = requestBody({
      Resources: this.parameters.Resources,
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

  async parseResponse(response: Response): Promise<msdyn_GetBookableResourcesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetBookableResourcesResponse;
  }
}
