import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetTimeLineRecords action
 */
export interface msdyn_GetTimeLineRecordsResponse {
  TimeLineWallRecords: string;
}

/**
 * Parameters of the msdyn_GetTimeLineRecords action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetTimeLineRecordsActionParameters {
  RegardingObjectId: string;
  NumberOfRecords: string;
}

/**
 * msdyn_GetTimeLineRecords action
 *
 * Unbound action
 */
export class msdyn_GetTimeLineRecordsAction implements Executable<msdyn_GetTimeLineRecordsResponse> {
  constructor(public readonly parameters: msdyn_GetTimeLineRecordsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetTimeLineRecords`;

    const body = requestBody({
      RegardingObjectId: this.parameters.RegardingObjectId,
      NumberOfRecords: this.parameters.NumberOfRecords,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetTimeLineRecordsResponse;
  }
}
