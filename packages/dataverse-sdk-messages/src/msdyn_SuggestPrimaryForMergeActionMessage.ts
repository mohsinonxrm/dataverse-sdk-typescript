import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SuggestPrimaryForMergeAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SuggestPrimaryForMergeActionRequestParameters {
  RecordList?: Record<string, unknown>[];
}

/**
 * msdyn_SuggestPrimaryForMergeAction request message
 *
 * Web API Action: msdyn_SuggestPrimaryForMergeAction
 */
export class msdyn_SuggestPrimaryForMergeActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_SuggestPrimaryForMergeActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_SuggestPrimaryForMergeActionRequestParameters>;

  constructor(parameters: msdyn_SuggestPrimaryForMergeActionRequestParameters = {}) {
    super("msdyn_SuggestPrimaryForMergeAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SuggestPrimaryForMergeAction`;

    const body = requestBody({
      RecordList: this.Parameters.RecordList,
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
    if (response.status === 204)
      return msdyn_SuggestPrimaryForMergeActionResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return msdyn_SuggestPrimaryForMergeActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SuggestPrimaryForMergeAction action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type msdyn_SuggestPrimaryForMergeActionResult = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * msdyn_SuggestPrimaryForMergeAction response message
 *
 * `result` is the value the msdyn_SuggestPrimaryForMergeAction action returns (see {@link msdyn_SuggestPrimaryForMergeActionResult}).
 */
export class msdyn_SuggestPrimaryForMergeActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_SuggestPrimaryForMergeActionResult) {
    super("msdyn_SuggestPrimaryForMergeAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SuggestPrimaryForMergeActionResponse {
    return new msdyn_SuggestPrimaryForMergeActionResponse(
      (data ?? null) as msdyn_SuggestPrimaryForMergeActionResult
    );
  }
}
