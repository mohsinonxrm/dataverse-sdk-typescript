import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SuggestPrimaryForMergeAction action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type msdyn_SuggestPrimaryForMergeActionResponse = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as msdyn_SuggestPrimaryForMergeActionResponse;
  }
}
