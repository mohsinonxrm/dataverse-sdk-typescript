import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from OnExternalUpdated action
 */
export interface OnExternalUpdatedResponse {
  // No content returned
}

/**
 * OnExternalUpdated action
 *
 * Unbound action
 */
export class OnExternalUpdatedAction implements Executable<OnExternalUpdatedResponse> {
  constructor(
    public readonly target: EntityReference | AnyEntityPayload,
    public readonly preImage?: EntityReference | AnyEntityPayload,
    public readonly changedFields?: string[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/OnExternalUpdated`;

    const body: Record<string, unknown> = {
      Target: this.target,
      PreImage: this.preImage,
      ChangedFields: this.changedFields,
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

  async parseResponse(response: Response): Promise<OnExternalUpdatedResponse> {
    // No return value (204 No Content)
    return {};
  }
}
