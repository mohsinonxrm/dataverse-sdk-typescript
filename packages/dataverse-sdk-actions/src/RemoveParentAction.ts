import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the RemoveParent action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type RemoveParentResponse = void;

/**
 * Parameters of the RemoveParent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RemoveParentActionParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * RemoveParent action
 *
 * Unbound action
 */
export class RemoveParentAction implements Executable<RemoveParentResponse> {
  constructor(public readonly parameters: RemoveParentActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RemoveParent`;

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

  parseResponse(_response: Response): Promise<RemoveParentResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
