import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_timetrackerapiResponse as msdyn_timetrackerapiResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_timetrackerapi message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_timetrackerapiRequestParameters {
  timeTrackerRecordId?: string;
  entitylogicalname: string;
  entityid: string;
  timeTrackerRecord?: EntityReference | AnyEntityPayload;
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
      entitylogicalname: this.Parameters.entitylogicalname,
      entityid: this.Parameters.entityid,
      timeTrackerRecord: this.Parameters.timeTrackerRecord,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_timetrackerapiResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_timetrackerapi response message
 */
export class msdyn_timetrackerapiResponse extends OrganizationResponse {
  constructor(public result: msdyn_timetrackerapiResponseData) {
    super("msdyn_timetrackerapi");
  }

  static fromResponse(data: unknown): msdyn_timetrackerapiResponse {
    return new msdyn_timetrackerapiResponse(responseObject<msdyn_timetrackerapiResponseData>(data));
  }
}
