import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from AddPrincipalToQueue action
 */
export interface AddPrincipalToQueueResponse {
  // No content returned
}

/**
 * Parameters of the AddPrincipalToQueue action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddPrincipalToQueueActionParameters {
  Principal: EntityReference | AnyEntityPayload;
}

/**
 * AddPrincipalToQueue action
 *
 * Bound action
 * Binding parameter: entity (mscrm.queue)
 *
 * The first argument is the id of the queue record to call it on.
 */
export class AddPrincipalToQueueAction implements Executable<AddPrincipalToQueueResponse> {
  constructor(
    public readonly queueId: string,
    public readonly parameters: AddPrincipalToQueueActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/queues(${this.queueId})/Microsoft.Dynamics.CRM.AddPrincipalToQueue`;

    const body = requestBody({
      Principal: this.parameters.Principal,
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

  async parseResponse(response: Response): Promise<AddPrincipalToQueueResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as AddPrincipalToQueueResponse;
    return (await response.json()) as AddPrincipalToQueueResponse;
  }
}
