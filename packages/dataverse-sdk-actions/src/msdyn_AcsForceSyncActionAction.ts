import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_AcsForceSyncAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_AcsForceSyncActionResponse {
  "@odata.context"?: string;
  ActionResult: string;
}

/**
 * Parameters of the msdyn_AcsForceSyncAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AcsForceSyncActionActionParameters {
  ActionRequest: string;
}

/**
 * msdyn_AcsForceSyncAction action
 *
 * Unbound action
 */
export class msdyn_AcsForceSyncActionAction implements Executable<msdyn_AcsForceSyncActionResponse> {
  constructor(public readonly parameters: msdyn_AcsForceSyncActionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AcsForceSyncAction`;

    const body = requestBody({
      ActionRequest: this.parameters.ActionRequest,
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

  async parseResponse(response: Response): Promise<msdyn_AcsForceSyncActionResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_AcsForceSyncActionResponse;
  }
}
