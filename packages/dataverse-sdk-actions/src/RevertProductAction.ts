import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from RevertProduct action
 */
export interface RevertProductResponse {
  // No content returned
}

/**
 * Parameters of the RevertProduct action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RevertProductActionParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * RevertProduct action
 *
 * Unbound action
 */
export class RevertProductAction implements Executable<RevertProductResponse> {
  constructor(public readonly parameters: RevertProductActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RevertProduct`;

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

  async parseResponse(response: Response): Promise<RevertProductResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RevertProductResponse;
    return (await response.json()) as RevertProductResponse;
  }
}
