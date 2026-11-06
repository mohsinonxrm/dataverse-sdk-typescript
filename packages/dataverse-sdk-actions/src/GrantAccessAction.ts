import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { PrincipalAccess } from "./types/index.js";

/**
 * Response from the GrantAccess action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type GrantAccessResponse = void;

/**
 * Parameters of the GrantAccess action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GrantAccessActionParameters {
  Target: EntityReference | AnyEntityPayload;
  PrincipalAccess?: PrincipalAccess;
}

/**
 * GrantAccess action
 *
 * Unbound action
 */
export class GrantAccessAction implements Executable<GrantAccessResponse> {
  constructor(public readonly parameters: GrantAccessActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GrantAccess`;

    const body = requestBody({
      Target: this.parameters.Target,
      PrincipalAccess: enumBody(this.parameters.PrincipalAccess, "PrincipalAccess"),
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

  parseResponse(_response: Response): Promise<GrantAccessResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
