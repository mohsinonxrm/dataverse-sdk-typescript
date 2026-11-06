import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_GetDuplicatesAction action
 */
export interface msdyn_GetDuplicatesActionResponse {
  value: EntityReference[];
}

/**
 * Parameters of the msdyn_GetDuplicatesAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetDuplicatesActionActionParameters {
  Record?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_GetDuplicatesAction action
 *
 * Unbound action
 */
export class msdyn_GetDuplicatesActionAction implements Executable<msdyn_GetDuplicatesActionResponse> {
  constructor(public readonly parameters: msdyn_GetDuplicatesActionActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetDuplicatesAction`;

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

  async parseResponse(response: Response): Promise<msdyn_GetDuplicatesActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetDuplicatesActionResponse;
  }
}
