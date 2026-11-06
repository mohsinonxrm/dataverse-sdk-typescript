import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the RevokeAccess action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type RevokeAccessResponse = void;

/**
 * Parameters of the RevokeAccess action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RevokeAccessActionParameters {
  Target: EntityReference | AnyEntityPayload;
  Revokee: EntityReference | AnyEntityPayload;
}

/**
 * RevokeAccess action
 *
 * Unbound action
 */
export class RevokeAccessAction implements Executable<RevokeAccessResponse> {
  constructor(public readonly parameters: RevokeAccessActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RevokeAccess`;

    const body = requestBody({
      Target: this.parameters.Target,
      Revokee: this.parameters.Revokee,
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

  parseResponse(_response: Response): Promise<RevokeAccessResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
