import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from RevokeAccess action
 */
export interface RevokeAccessResponse {
  // No content returned
}

/**
 * RevokeAccess action
 *
 * Unbound action
 */
export class RevokeAccessAction implements Executable<RevokeAccessResponse> {
  constructor(
    public readonly target: EntityReference | AnyEntityPayload,
    public readonly revokee: EntityReference | AnyEntityPayload
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RevokeAccess`;

    const body: Record<string, unknown> = {
      Target: this.target,
      Revokee: this.revokee,
    };

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
    // No return value (204 No Content)
    return {};
  }
}
