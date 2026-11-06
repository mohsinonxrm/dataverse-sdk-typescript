import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { delegatedauthorization } from "./types/index.js";

/**
 * Response from the GrantDelegatedAccess action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type GrantDelegatedAccessResponse = void;

/**
 * Parameters of the GrantDelegatedAccess action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GrantDelegatedAccessActionParameters {
  delegatedauthorization: EntityReference | EntityPayload<delegatedauthorization>;
  target: EntityReference | AnyEntityPayload;
  owneraccess: boolean;
}

/**
 * GrantDelegatedAccess action
 *
 * Unbound action
 */
export class GrantDelegatedAccessAction implements Executable<GrantDelegatedAccessResponse> {
  constructor(public readonly parameters: GrantDelegatedAccessActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GrantDelegatedAccess`;

    const body = requestBody({
      delegatedauthorization: this.parameters.delegatedauthorization,
      target: this.parameters.target,
      owneraccess: this.parameters.owneraccess,
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

  parseResponse(_response: Response): Promise<GrantDelegatedAccessResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
