import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { enumBody } from "./internal/enumBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
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
    public readonly target: EntityReference | AnyEntityPayload,
    public readonly sharedRights: AccessRights
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RevokeSharedLink`;

    const body: Record<string, unknown> = {
      Target: this.target,
      SharedRights: enumBody(this.sharedRights, "AccessRights"),
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

  async parseResponse(response: Response): Promise<RevokeSharedLinkResponse> {
    // No return value (204 No Content)
    return {};
  }
}
