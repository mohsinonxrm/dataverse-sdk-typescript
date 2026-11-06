import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_Polling action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_PollingResponse {
  "@odata.context"?: string;
  res: string;
  response: string;
}

/**
 * Parameters of the msdyn_Polling action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PollingActionParameters {
  liveWorkItemId: string;
  entityLogicalName: string;
}

/**
 * msdyn_Polling action
 *
 * Unbound action
 */
export class msdyn_PollingAction implements Executable<msdyn_PollingResponse> {
  constructor(public readonly parameters: msdyn_PollingActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_Polling`;

    const body = requestBody({
      liveWorkItemId: this.parameters.liveWorkItemId,
      entityLogicalName: this.parameters.entityLogicalName,
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

  async parseResponse(response: Response): Promise<msdyn_PollingResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_PollingResponse;
  }
}
