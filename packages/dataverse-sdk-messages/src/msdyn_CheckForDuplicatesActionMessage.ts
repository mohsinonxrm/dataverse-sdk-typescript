import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_CheckForDuplicatesAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForDuplicatesActionRequestParameters {
  Record?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_CheckForDuplicatesAction request message
 *
 * Web API Action: msdyn_CheckForDuplicatesAction
 */
export class msdyn_CheckForDuplicatesActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForDuplicatesActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckForDuplicatesActionRequestParameters>;

  constructor(parameters: msdyn_CheckForDuplicatesActionRequestParameters = {}) {
    super("msdyn_CheckForDuplicatesAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForDuplicatesAction`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckForDuplicatesActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CheckForDuplicatesActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckForDuplicatesAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckForDuplicatesActionResult {
  "@odata.context"?: string;
  DuplicateRecordCount: number;
  IsDuplicateDetectionEnabled: boolean;
}

/**
 * msdyn_CheckForDuplicatesAction response message
 *
 * `result` is the value the msdyn_CheckForDuplicatesAction action returns (see {@link msdyn_CheckForDuplicatesActionResult}).
 */
export class msdyn_CheckForDuplicatesActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForDuplicatesActionResult) {
    super("msdyn_CheckForDuplicatesAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckForDuplicatesActionResponse {
    return new msdyn_CheckForDuplicatesActionResponse(data as msdyn_CheckForDuplicatesActionResult);
  }
}
