import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AccessRights } from "./types/index.js";

/**
 * Response from RevokeSharedLink action
 */
export interface RevokeSharedLinkResponse {
  // No content returned
}

/**
 * RevokeSharedLink action
 *
 * Unbound action
 */
export class RevokeSharedLinkAction implements Executable<RevokeSharedLinkResponse> {
  constructor(
    public readonly target: EntityReference,
    public readonly sharedRights: AccessRights
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RevokeSharedLink`;

    const body: Record<string, unknown> = {
      Target: this.target,
      SharedRights: this.sharedRights,
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

  async parseResponse(response: Response): Promise<RevokeSharedLinkResponse> {
    // No return value (204 No Content)
    return {};
  }
}
