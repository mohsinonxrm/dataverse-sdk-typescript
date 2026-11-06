import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the OnExternalUpdated action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type OnExternalUpdatedResponse = void;

/**
 * Parameters of the OnExternalUpdated action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface OnExternalUpdatedActionParameters {
  Target: EntityReference | AnyEntityPayload;
  PreImage?: EntityReference | AnyEntityPayload;
  ChangedFields?: string[];
}

/**
 * OnExternalUpdated action
 *
 * Unbound action
 */
export class OnExternalUpdatedAction implements Executable<OnExternalUpdatedResponse> {
  constructor(public readonly parameters: OnExternalUpdatedActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/OnExternalUpdated`;

    const body = requestBody({
      Target: this.parameters.Target,
      PreImage: this.parameters.PreImage,
      ChangedFields: this.parameters.ChangedFields,
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

  parseResponse(_response: Response): Promise<OnExternalUpdatedResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
