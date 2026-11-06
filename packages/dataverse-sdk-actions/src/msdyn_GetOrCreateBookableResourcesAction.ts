import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetOrCreateBookableResources action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetOrCreateBookableResourcesResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetOrCreateBookableResourcesResponse;
  }
}
