import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AccessRights } from "./types/index.js";

/**
 * Response from GenerateSharedLink action
 */
export interface GenerateSharedLinkResponse {
  Response: string;
}

/**
 * GenerateSharedLink action
 *
 * Unbound action
 */
export class GenerateSharedLinkAction implements Executable<GenerateSharedLinkResponse> {
  constructor(
    public readonly target: EntityReference,
    public readonly sharedRights: AccessRights
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GenerateSharedLink`;

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

  async parseResponse(response: Response): Promise<GenerateSharedLinkResponse> {
    const data = await response.json();
    return data as GenerateSharedLinkResponse;
  }
}
