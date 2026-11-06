import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_timetrackerapi action
 */
export interface msdyn_timetrackerapiResponse {
  timetrackerjson: string;
}

/**
 * msdyn_timetrackerapi action
 *
 * Unbound action
 */
export class msdyn_timetrackerapiAction implements Executable<msdyn_timetrackerapiResponse> {
  constructor(
    public readonly timeTrackerRecordId: string | undefined,
    public readonly entitylogicalname: string,
    public readonly entityid: string,
    public readonly timeTrackerRecord?: EntityReference | AnyEntityPayload
  ) {}

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
    return data as msdyn_timetrackerapiResponse;
  }
}
