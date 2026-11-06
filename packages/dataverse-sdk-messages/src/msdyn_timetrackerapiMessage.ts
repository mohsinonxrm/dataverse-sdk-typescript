import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_timetrackerapiResponse as msdyn_timetrackerapiResponseData } from "./types/index.js";

/**
 * msdyn_timetrackerapi request message
 *
 * Web API Action: msdyn_timetrackerapi
 */
export class msdyn_timetrackerapiRequest
  extends OrganizationRequest
  implements Executable<msdyn_timetrackerapiResponse>
{
  constructor(
    public timeTrackerRecordId: string | undefined,
    public entitylogicalname: string,
    public entityid: string,
    public timeTrackerRecord?: EntityReference | AnyEntityPayload
  ) {
    super("msdyn_timetrackerapi");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_timetrackerapi`;

    const body: Record<string, unknown> = {
      timeTrackerRecordId: this.timeTrackerRecordId,
      entitylogicalname: this.entitylogicalname,
      entityid: this.entityid,
      timeTrackerRecord: this.timeTrackerRecord,
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

  async parseResponse(response: Response): Promise<msdyn_timetrackerapiResponse> {
    const data = await response.json();
    return msdyn_timetrackerapiResponse.fromResponse(data);
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
