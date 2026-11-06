import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_GetQueuesAWT action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_GetQueuesAWTResponse {
  "@odata.context"?: string;
  Queues: string;
}

/**
 * Parameters of the CCaaS_GetQueuesAWT action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetQueuesAWTActionParameters {
  ApiVersion: string;
  QueueIds: string[];
}

/**
 * CCaaS_GetQueuesAWT action
 *
 * Unbound action
 */
export class CCaaS_GetQueuesAWTAction implements Executable<CCaaS_GetQueuesAWTResponse> {
  constructor(public readonly parameters: CCaaS_GetQueuesAWTActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_GetQueuesAWT`;

    const body = requestBody({
      ApiVersion: this.parameters.ApiVersion,
      QueueIds: this.parameters.QueueIds,
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

  async parseResponse(response: Response): Promise<CCaaS_GetQueuesAWTResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CCaaS_GetQueuesAWTResponse;
  }
}
