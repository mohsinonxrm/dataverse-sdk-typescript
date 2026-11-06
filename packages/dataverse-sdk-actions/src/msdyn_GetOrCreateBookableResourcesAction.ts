import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetOrCreateBookableResources action
 */
export interface msdyn_GetOrCreateBookableResourcesResponse {
  BookableResources: string;
}

/**
 * Parameters of the msdyn_GetOrCreateBookableResources action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetOrCreateBookableResourcesActionParameters {
  Resources: string;
}

/**
 * msdyn_GetOrCreateBookableResources action
 *
 * Unbound action
 */
export class msdyn_GetOrCreateBookableResourcesAction implements Executable<msdyn_GetOrCreateBookableResourcesResponse> {
  constructor(public readonly parameters: msdyn_GetOrCreateBookableResourcesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOrCreateBookableResources`;

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

  async parseResponse(response: Response): Promise<msdyn_GetOrCreateBookableResourcesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetOrCreateBookableResourcesResponse;
  }
}
