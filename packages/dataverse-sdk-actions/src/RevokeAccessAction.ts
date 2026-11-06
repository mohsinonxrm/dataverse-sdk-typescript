import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from RevokeAccess action
 */
export interface RevokeAccessResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<RevokeAccessResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RevokeAccessResponse;
    return (await response.json()) as RevokeAccessResponse;
  }
}
