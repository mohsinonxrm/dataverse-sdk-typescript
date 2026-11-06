import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_timetrackerapi action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_timetrackerapiResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_timetrackerapiResponse;
  }
}
