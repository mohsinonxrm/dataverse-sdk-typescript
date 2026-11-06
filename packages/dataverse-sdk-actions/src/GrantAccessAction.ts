import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { PrincipalAccess } from "./types/index.js";

/**
 * Response from GrantAccess action
 */
export interface GrantAccessResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<GrantAccessResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as GrantAccessResponse;
    return (await response.json()) as GrantAccessResponse;
  }
}
