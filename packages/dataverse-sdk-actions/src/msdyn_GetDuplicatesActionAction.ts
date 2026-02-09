import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_GetDuplicatesAction action
 */
export interface msdyn_GetDuplicatesActionResponse {
  value: EntityReference[];
}

/**
 * msdyn_GetDuplicatesAction action
 *
 * Unbound action
 */
export class msdyn_GetDuplicatesActionAction implements Executable<msdyn_GetDuplicatesActionResponse> {
  constructor(public readonly record: EntityReference) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetDuplicatesAction`;

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

  async parseResponse(response: Response): Promise<msdyn_GetDuplicatesActionResponse> {
    const data = await response.json();
    return data as msdyn_GetDuplicatesActionResponse;
  }
}
