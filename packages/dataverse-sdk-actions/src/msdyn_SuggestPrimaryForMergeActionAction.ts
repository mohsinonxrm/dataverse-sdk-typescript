import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_SuggestPrimaryForMergeAction action
 */
export interface msdyn_SuggestPrimaryForMergeActionResponse {
  value: EntityReference;
}

/**
 * msdyn_SuggestPrimaryForMergeAction action
 *
 * Unbound action
 */
export class msdyn_SuggestPrimaryForMergeActionAction implements Executable<msdyn_SuggestPrimaryForMergeActionResponse> {
  constructor(public readonly recordList: Record<string, unknown>[]) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SuggestPrimaryForMergeAction`;

    const body: Record<string, unknown> = {
      RecordList: this.recordList,
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

  async parseResponse(response: Response): Promise<msdyn_SuggestPrimaryForMergeActionResponse> {
    const data = await response.json();
    return data as msdyn_SuggestPrimaryForMergeActionResponse;
  }
}
