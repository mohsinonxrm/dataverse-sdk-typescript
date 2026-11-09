import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_GetDuplicatesAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetDuplicatesActionRequestParameters {
  Record?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_GetDuplicatesAction request message
 *
 * Web API Action: msdyn_GetDuplicatesAction
 */
export class msdyn_GetDuplicatesActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetDuplicatesActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetDuplicatesActionRequestParameters>;

  constructor(parameters: msdyn_GetDuplicatesActionRequestParameters = {}) {
    super("msdyn_GetDuplicatesAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetDuplicatesAction`;

    const body = requestBody({
      Record: this.Parameters.Record,
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

  async parseResponse(response: Response): Promise<msdyn_GetDuplicatesActionResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return msdyn_GetDuplicatesActionResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return msdyn_GetDuplicatesActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetDuplicatesAction action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdyn_GetDuplicatesActionResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * msdyn_GetDuplicatesAction response message
 *
 * `result` is the value the msdyn_GetDuplicatesAction action returns (see {@link msdyn_GetDuplicatesActionResult}).
 */
export class msdyn_GetDuplicatesActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetDuplicatesActionResult) {
    super("msdyn_GetDuplicatesAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetDuplicatesActionResponse {
    return new msdyn_GetDuplicatesActionResponse(
      data === undefined ? [] : (data as { value: msdyn_GetDuplicatesActionResult }).value
    );
  }
}
