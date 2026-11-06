import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from Merge action
 */
export interface MergeResponse {
  // No content returned
}

/**
 * Merge action
 *
 * Unbound action
 */
export class MergeAction implements Executable<MergeResponse> {
  constructor(
    public readonly target: EntityReference | AnyEntityPayload,
    public readonly subordinate: EntityReference | AnyEntityPayload,
    public readonly updateContent: EntityReference | AnyEntityPayload | undefined,
    public readonly performParentingChecks: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/Merge`;

    const body: Record<string, unknown> = {
      Target: this.target,
      Subordinate: this.subordinate,
      UpdateContent: this.updateContent,
      PerformParentingChecks: this.performParentingChecks,
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

  async parseResponse(response: Response): Promise<MergeResponse> {
    // No return value (204 No Content)
    return {};
  }
}
