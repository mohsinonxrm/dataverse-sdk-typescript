import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_timetrackerapi message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_timetrackerapiRequestParameters {
  timeTrackerRecordId?: string;
  timeTrackerRecord?: EntityReference | AnyEntityPayload;
  entityid: string;
  entitylogicalname: string;
}

/**
 * msdyn_timetrackerapi request message
 *
 * Web API Action: msdyn_timetrackerapi
 */
export class msdyn_timetrackerapiRequest
  extends OrganizationRequest
  implements Executable<msdyn_timetrackerapiResponse>
{
  declare readonly Parameters: Readonly<msdyn_timetrackerapiRequestParameters>;

  constructor(parameters: msdyn_timetrackerapiRequestParameters) {
    super("msdyn_timetrackerapi", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_timetrackerapi`;

    const body = requestBody({
      timeTrackerRecordId: this.Parameters.timeTrackerRecordId,
      timeTrackerRecord: this.Parameters.timeTrackerRecord,
      entityid: this.Parameters.entityid,
      entitylogicalname: this.Parameters.entitylogicalname,
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

  async parseResponse(response: Response): Promise<msdyn_timetrackerapiResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_timetrackerapiResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_timetrackerapi action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_timetrackerapiResult {
  "@odata.context"?: string;
  timetrackerjson: string;
}

/**
 * msdyn_timetrackerapi response message
 *
 * `result` is the value the msdyn_timetrackerapi action returns (see {@link msdyn_timetrackerapiResult}).
 */
export class msdyn_timetrackerapiResponse extends OrganizationResponse {
  constructor(public result: msdyn_timetrackerapiResult) {
    super("msdyn_timetrackerapi");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_timetrackerapiResponse {
    return new msdyn_timetrackerapiResponse(data as msdyn_timetrackerapiResult);
  }
}
