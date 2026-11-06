import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_OnNewActivityForARCRecord action
 */
export interface msdyn_OnNewActivityForARCRecordResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_OnNewActivityForARCRecord action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OnNewActivityForARCRecordActionParameters {
  msdyn_sourceEntityReference: EntityReference | AnyEntityPayload;
  msdyn_primaryEntityReference: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_OnNewActivityForARCRecord action
 *
 * Unbound action
 */
export class msdyn_OnNewActivityForARCRecordAction implements Executable<msdyn_OnNewActivityForARCRecordResponse> {
  constructor(public readonly parameters: msdyn_OnNewActivityForARCRecordActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OnNewActivityForARCRecord`;

    const body = requestBody({
      msdyn_sourceEntityReference: this.parameters.msdyn_sourceEntityReference,
      msdyn_primaryEntityReference: this.parameters.msdyn_primaryEntityReference,
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

  async parseResponse(response: Response): Promise<msdyn_OnNewActivityForARCRecordResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_OnNewActivityForARCRecordResponse;
    return (await response.json()) as msdyn_OnNewActivityForARCRecordResponse;
  }
}
