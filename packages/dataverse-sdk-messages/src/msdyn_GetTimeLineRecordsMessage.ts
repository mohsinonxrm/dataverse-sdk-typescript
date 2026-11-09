import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetTimeLineRecords message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetTimeLineRecordsRequestParameters {
  RegardingObjectId: string;
  NumberOfRecords: string;
}

/**
 * msdyn_GetTimeLineRecords request message
 *
 * Web API Action: msdyn_GetTimeLineRecords
 */
export class msdyn_GetTimeLineRecordsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetTimeLineRecordsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetTimeLineRecordsRequestParameters>;

  constructor(parameters: msdyn_GetTimeLineRecordsRequestParameters) {
    super("msdyn_GetTimeLineRecords", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetTimeLineRecords`;

    const body = requestBody({
      RegardingObjectId: this.Parameters.RegardingObjectId,
      NumberOfRecords: this.Parameters.NumberOfRecords,
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

  async parseResponse(response: Response): Promise<msdyn_GetTimeLineRecordsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetTimeLineRecordsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetTimeLineRecords action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetTimeLineRecordsResult {
  "@odata.context"?: string;
  TimeLineWallRecords: string;
}

/**
 * msdyn_GetTimeLineRecords response message
 *
 * `result` is the value the msdyn_GetTimeLineRecords action returns (see {@link msdyn_GetTimeLineRecordsResult}).
 */
export class msdyn_GetTimeLineRecordsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetTimeLineRecordsResult) {
    super("msdyn_GetTimeLineRecords");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetTimeLineRecordsResponse {
    return new msdyn_GetTimeLineRecordsResponse(data as msdyn_GetTimeLineRecordsResult);
  }
}
