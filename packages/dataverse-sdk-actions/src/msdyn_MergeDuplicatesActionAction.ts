import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_MergeDuplicatesAction action
 */
export interface msdyn_MergeDuplicatesActionResponse {
  // No content returned
}

/**
 * msdyn_MergeDuplicatesAction action
 *
 * Unbound action
 */
export class msdyn_MergeDuplicatesActionAction implements Executable<msdyn_MergeDuplicatesActionResponse> {
  constructor(
    public readonly target: EntityReference,
    public readonly duplicates: Record<string, unknown>[],
    public readonly performParentingChecks: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MergeDuplicatesAction`;

    const body: Record<string, unknown> = {
      Target: this.target,
      Duplicates: this.duplicates,
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

  async parseResponse(response: Response): Promise<msdyn_MergeDuplicatesActionResponse> {
    // No return value (204 No Content)
    return {};
  }
}
