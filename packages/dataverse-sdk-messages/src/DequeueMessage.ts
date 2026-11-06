import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the Dequeue message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DequeueRequestParameters {
  request?: string;
}

/**
 * Dequeue request message
 *
 * Web API Action: Dequeue
 *
 * The first argument is the id of the workqueue record to call it on.
 */
export class DequeueRequest extends OrganizationRequest implements Executable<DequeueResponse> {
  declare readonly Parameters: Readonly<DequeueRequestParameters>;

  constructor(
    public workqueueId: string,
    parameters: DequeueRequestParameters = {}
  ) {
    super("Dequeue", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workqueues(${this.workqueueId})/Microsoft.Dynamics.CRM.Dequeue`;

    const body = requestBody({
      request: this.Parameters.request,
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
    return DequeueResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * Dequeue response message
 */
export class DequeueResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("Dequeue");
  }

  static fromResponse(data: unknown): DequeueResponse {
    return new DequeueResponse(responseObject<Record<string, unknown>>(data));
  }
}
