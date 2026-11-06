import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_QueueItemCreateOperation action
 */
export interface msdyn_QueueItemCreateOperationResponse {
  msdyn_queueItemCreateAPIResponse: string;
}

/**
 * Parameters of the msdyn_QueueItemCreateOperation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_QueueItemCreateOperationActionParameters {
  LiveWorkItemId: string;
}

/**
 * msdyn_QueueItemCreateOperation action
 *
 * Unbound action
 */
export class msdyn_QueueItemCreateOperationAction implements Executable<msdyn_QueueItemCreateOperationResponse> {
  constructor(public readonly parameters: msdyn_QueueItemCreateOperationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_QueueItemCreateOperation`;

    const body = requestBody({
      LiveWorkItemId: this.parameters.LiveWorkItemId,
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

  async parseResponse(response: Response): Promise<msdyn_QueueItemCreateOperationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_QueueItemCreateOperationResponse;
    return (await response.json()) as msdyn_QueueItemCreateOperationResponse;
  }
}
