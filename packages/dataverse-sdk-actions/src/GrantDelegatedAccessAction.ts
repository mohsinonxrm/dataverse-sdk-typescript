import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { delegatedauthorization } from "./types/index.js";

/**
 * Response from GrantDelegatedAccess action
 */
export interface GrantDelegatedAccessResponse {
  // No content returned
}

/**
 * GrantDelegatedAccess action
 *
 * Unbound action
 */
export class GrantDelegatedAccessAction implements Executable<GrantDelegatedAccessResponse> {
  constructor(
    public readonly target: EntityReference,
    public readonly delegatedauthorization: delegatedauthorization,
    public readonly owneraccess: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GrantDelegatedAccess`;

    const body: Record<string, unknown> = {
      target: this.target,
      delegatedauthorization: this.delegatedauthorization,
      owneraccess: this.owneraccess,
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

  async parseResponse(response: Response): Promise<GrantDelegatedAccessResponse> {
    // No return value (204 No Content)
    return {};
  }
}
