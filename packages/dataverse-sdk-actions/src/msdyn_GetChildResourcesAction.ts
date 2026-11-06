import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetChildResources action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetChildResourcesResponse {
  "@odata.context"?: string;
  ChildResources: string;
}

/**
 * Parameters of the msdyn_GetChildResources action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetChildResourcesActionParameters {
  ResourceIds: string;
  UfxParameter: string;
}

/**
 * msdyn_GetChildResources action
 *
 * Unbound action
 */
export class msdyn_GetChildResourcesAction implements Executable<msdyn_GetChildResourcesResponse> {
  constructor(public readonly parameters: msdyn_GetChildResourcesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetChildResources`;

    const body = requestBody({
      ResourceIds: this.parameters.ResourceIds,
      UfxParameter: this.parameters.UfxParameter,
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

  async parseResponse(response: Response): Promise<msdyn_GetChildResourcesResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetChildResourcesResponse;
  }
}
