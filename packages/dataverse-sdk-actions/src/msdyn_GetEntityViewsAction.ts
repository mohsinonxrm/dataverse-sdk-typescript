import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetEntityViews action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetEntityViewsResponse {
  "@odata.context"?: string;
  msdyn_output: string;
}

/**
 * Parameters of the msdyn_GetEntityViews action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetEntityViewsActionParameters {
  msdyn_input: string;
}

/**
 * msdyn_GetEntityViews action
 *
 * Unbound action
 */
export class msdyn_GetEntityViewsAction implements Executable<msdyn_GetEntityViewsResponse> {
  constructor(public readonly parameters: msdyn_GetEntityViewsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetEntityViews`;

    const body = requestBody({
      msdyn_input: this.parameters.msdyn_input,
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

  async parseResponse(response: Response): Promise<msdyn_GetEntityViewsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetEntityViewsResponse;
  }
}
