import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetResources action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetResourcesResponse {
  "@odata.context"?: string;
  ResourceData: string;
}

/**
 * Parameters of the msdyn_GetResources action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetResourcesActionParameters {
  Page: number;
  PageSize: number;
  QueryString: string;
}

/**
 * msdyn_GetResources action
 *
 * Unbound action
 */
export class msdyn_GetResourcesAction implements Executable<msdyn_GetResourcesResponse> {
  constructor(public readonly parameters: msdyn_GetResourcesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetResources`;

    const body = requestBody({
      Page: this.parameters.Page,
      PageSize: this.parameters.PageSize,
      QueryString: this.parameters.QueryString,
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

  async parseResponse(response: Response): Promise<msdyn_GetResourcesResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetResourcesResponse;
  }
}
