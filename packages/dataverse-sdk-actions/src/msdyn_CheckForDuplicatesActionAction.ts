import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_CheckForDuplicatesAction action
 */
export interface msdyn_CheckForDuplicatesActionResponse {
  IsDuplicateDetectionEnabled: boolean;
  DuplicateRecordCount: number;
}

/**
 * Parameters of the msdyn_CheckForDuplicatesAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForDuplicatesActionActionParameters {
  Record?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_CheckForDuplicatesAction action
 *
 * Unbound action
 */
export class msdyn_CheckForDuplicatesActionAction implements Executable<msdyn_CheckForDuplicatesActionResponse> {
  constructor(public readonly parameters: msdyn_CheckForDuplicatesActionActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForDuplicatesAction`;

    const body = requestBody({
      Record: this.parameters.Record,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CheckForDuplicatesActionResponse;
  }
}
