import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

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
    public timeTrackerRecordId: string,
    public entitylogicalname: string,
    public entityid: string,
    public timeTrackerRecord: EntityReference
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

  toRequestBody(): Record<string, unknown> {
    return {
      timeTrackerRecordId: this.timeTrackerRecordId,
      entitylogicalname: this.entitylogicalname,
      entityid: this.entityid,
      timeTrackerRecord: this.timeTrackerRecord,
    };
  }
}

/**
 * msdyn_timetrackerapi response message
 */
export class msdyn_timetrackerapiResponse extends OrganizationResponse {
  constructor(public result: msdyn_timetrackerapiResponse) {
    super("msdyn_timetrackerapi");
  }

  static fromResponse(data: unknown): msdyn_timetrackerapiResponse {
    return new msdyn_timetrackerapiResponse((data as any).value);
  }
}
