import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_QueueItemCreateOperation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_QueueItemCreateOperationResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_QueueItemCreateOperationResponse;
  }
}
