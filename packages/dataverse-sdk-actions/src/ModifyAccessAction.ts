import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { PrincipalAccess } from "./types/index.js";

/**
 * Response from ModifyAccess action
 */
export interface ModifyAccessResponse {
  // No content returned
}

/**
 * ModifyAccess action
 *
 * Unbound action
 */
export class ModifyAccessAction implements Executable<ModifyAccessResponse> {
  constructor(
    public readonly target: EntityReference,
    public readonly principalAccess: PrincipalAccess
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ModifyAccess`;

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

  async parseResponse(response: Response): Promise<ModifyAccessResponse> {
    // No return value (204 No Content)
    return {};
  }
}
