import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { delegatedauthorization } from "./types/index.js";

/**
 * Response from GrantDelegatedAccess action
 */
export interface GrantDelegatedAccessResponse {
  // No content returned
}

/**
 * Parameters of the GrantDelegatedAccess action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GrantDelegatedAccessActionParameters {
  target: EntityReference | AnyEntityPayload;
  delegatedauthorization: EntityReference | EntityPayload<delegatedauthorization>;
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
      target: this.parameters.target,
      delegatedauthorization: this.parameters.delegatedauthorization,
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

  async parseResponse(response: Response): Promise<GrantDelegatedAccessResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as GrantDelegatedAccessResponse;
  }
}
