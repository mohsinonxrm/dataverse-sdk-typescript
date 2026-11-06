import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the RevertProduct action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type RevertProductResponse = void;

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

  parseResponse(_response: Response): Promise<RevertProductResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
