import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_Polling action
 */
export interface msdyn_PollingResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_PollingResponse;
    return (await response.json()) as msdyn_PollingResponse;
  }
}
