import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from ValidateUnpublished action
 */
export interface ValidateUnpublishedResponse {
  // No content returned
}

/**
 * Parameters of the ValidateUnpublished action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ValidateUnpublishedActionParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * ValidateUnpublished action
 *
 * Unbound action
 */
export class ValidateUnpublishedAction implements Executable<ValidateUnpublishedResponse> {
  constructor(public readonly parameters: ValidateUnpublishedActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ValidateUnpublished`;

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

  async parseResponse(response: Response): Promise<ValidateUnpublishedResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ValidateUnpublishedResponse;
    return (await response.json()) as ValidateUnpublishedResponse;
  }
}
