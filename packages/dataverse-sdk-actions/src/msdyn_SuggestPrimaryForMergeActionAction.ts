import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
 * Parameters of the msdyn_SuggestPrimaryForMergeAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SuggestPrimaryForMergeActionActionParameters {
  RecordList?: Record<string, unknown>[];
}

/**
 * msdyn_SuggestPrimaryForMergeAction action
 *
 * Unbound action
 */
export class msdyn_SuggestPrimaryForMergeActionAction implements Executable<msdyn_SuggestPrimaryForMergeActionResponse> {
  constructor(
    public readonly parameters: msdyn_SuggestPrimaryForMergeActionActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SuggestPrimaryForMergeAction`;

    const body = requestBody({
      RecordList: this.parameters.RecordList,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SuggestPrimaryForMergeActionResponse;
    return (await response.json()) as msdyn_SuggestPrimaryForMergeActionResponse;
  }
}
