import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_CheckForDuplicatesAction action
 */
export interface msdyn_CheckForDuplicatesActionResponse {
  IsDuplicateDetectionEnabled: boolean;
  DuplicateRecordCount: number;
}

/**
 * msdyn_CheckForDuplicatesAction action
 *
 * Unbound action
 */
export class msdyn_CheckForDuplicatesActionAction implements Executable<msdyn_CheckForDuplicatesActionResponse> {
  constructor(public readonly record: EntityReference) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForDuplicatesAction`;

    const body: Record<string, unknown> = {
      Record: this.record,
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

  async parseResponse(response: Response): Promise<msdyn_CheckForDuplicatesActionResponse> {
    const data = await response.json();
    return data as msdyn_CheckForDuplicatesActionResponse;
  }
}
