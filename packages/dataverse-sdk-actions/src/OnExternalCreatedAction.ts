import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the OnExternalCreated action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type OnExternalCreatedResponse = void;

/**
 * Parameters of the OnExternalCreated action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface OnExternalCreatedActionParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * OnExternalCreated action
 *
 * Unbound action
 */
export class OnExternalCreatedAction implements Executable<OnExternalCreatedResponse> {
  constructor(public readonly parameters: OnExternalCreatedActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/OnExternalCreated`;

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

  parseResponse(_response: Response): Promise<OnExternalCreatedResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
