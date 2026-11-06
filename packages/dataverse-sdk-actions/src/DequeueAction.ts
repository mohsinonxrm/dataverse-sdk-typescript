import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from Dequeue action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface DequeueResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
}

/**
 * Parameters of the Dequeue action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DequeueActionParameters {
  request?: string;
}

/**
 * Dequeue action
 *
 * Bound action
 * Binding parameter: entity (mscrm.workqueue)
 *
 * The first argument is the id of the workqueue record to call it on.
 */
export class DequeueAction implements Executable<DequeueResponse> {
  constructor(
    public readonly workqueueId: string,
    public readonly parameters: DequeueActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workqueues(${this.workqueueId})/Microsoft.Dynamics.CRM.Dequeue`;

    const body = requestBody({
      request: this.parameters.request,
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

  async parseResponse(response: Response): Promise<DequeueResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as DequeueResponse;
  }
}
