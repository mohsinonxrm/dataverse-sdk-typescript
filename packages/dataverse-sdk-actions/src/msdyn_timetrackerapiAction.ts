import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_timetrackerapi action
 */
export interface msdyn_timetrackerapiResponse {
  timetrackerjson: string;
}

/**
 * Parameters of the msdyn_timetrackerapi action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_timetrackerapiActionParameters {
  timeTrackerRecordId?: string;
  timeTrackerRecord?: EntityReference | AnyEntityPayload;
  entityid: string;
  entitylogicalname: string;
}

/**
 * msdyn_timetrackerapi action
 *
 * Unbound action
 */
export class msdyn_timetrackerapiAction implements Executable<msdyn_timetrackerapiResponse> {
  constructor(public readonly parameters: msdyn_timetrackerapiActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_timetrackerapi`;

    const body = requestBody({
      timeTrackerRecordId: this.parameters.timeTrackerRecordId,
      timeTrackerRecord: this.parameters.timeTrackerRecord,
      entityid: this.parameters.entityid,
      entitylogicalname: this.parameters.entitylogicalname,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_timetrackerapiResponse;
    return (await response.json()) as msdyn_timetrackerapiResponse;
  }
}
