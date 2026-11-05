import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_OnNewActivityForARCRecord action
 */
export interface msdyn_OnNewActivityForARCRecordResponse {
  // No content returned
}

/**
 * msdyn_OnNewActivityForARCRecord action
 *
 * Unbound action
 */
export class msdyn_OnNewActivityForARCRecordAction implements Executable<msdyn_OnNewActivityForARCRecordResponse> {
  constructor(
    public readonly msdyn_primaryEntityReference: EntityReference,
    public readonly msdyn_sourceEntityReference: EntityReference
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OnNewActivityForARCRecord`;

    const body: Record<string, unknown> = {
      msdyn_primaryEntityReference: this.msdyn_primaryEntityReference,
      msdyn_sourceEntityReference: this.msdyn_sourceEntityReference,
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

  async parseResponse(response: Response): Promise<msdyn_OnNewActivityForARCRecordResponse> {
    // No return value (204 No Content)
    return {};
  }
}
