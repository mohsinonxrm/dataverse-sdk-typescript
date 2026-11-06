import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SuggestPrimaryForMergeAction action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface msdyn_SuggestPrimaryForMergeActionResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
}

/**
 * msdyn_SuggestPrimaryForMergeAction action
 *
 * Unbound action
 */
export class msdyn_SuggestPrimaryForMergeActionAction implements Executable<msdyn_SuggestPrimaryForMergeActionResponse> {
  constructor(public readonly recordList?: Record<string, unknown>[]) {}

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
