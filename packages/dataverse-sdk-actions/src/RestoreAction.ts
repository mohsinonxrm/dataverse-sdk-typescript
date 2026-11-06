import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the Restore action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RestoreResponse {
  "@odata.context"?: string;
  id: string;
}

/**
 * Parameters of the Restore action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RestoreActionParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * Restore action
 *
 * Unbound action
 */
export class RestoreAction implements Executable<RestoreResponse> {
  constructor(public readonly parameters: RestoreActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/Restore`;

    const body = requestBody({
      Target: this.parameters.Target,
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

  async parseResponse(response: Response): Promise<RestoreResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RestoreResponse;
  }
}
