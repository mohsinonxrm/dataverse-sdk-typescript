import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { PrincipalAccess } from "./types/index.js";

/**
 * Response from GrantAccess action
 */
export interface GrantAccessResponse {
  // No content returned
}

/**
 * GrantAccess action
 *
 * Unbound action
 */
export class GrantAccessAction implements Executable<GrantAccessResponse> {
  constructor(
    public readonly target: EntityReference,
    public readonly principalAccess: PrincipalAccess
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GrantAccess`;

    const body: Record<string, unknown> = {
      Target: this.target,
      PrincipalAccess: this.principalAccess,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<GrantAccessResponse> {
    // No return value (204 No Content)
    return {};
  }
}
