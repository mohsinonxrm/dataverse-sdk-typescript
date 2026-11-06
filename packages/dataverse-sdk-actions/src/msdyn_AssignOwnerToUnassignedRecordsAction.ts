import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_AssignOwnerToUnassignedRecords action
 */
export interface msdyn_AssignOwnerToUnassignedRecordsResponse {
  AssignmentResults: string;
}

/**
 * Parameters of the msdyn_AssignOwnerToUnassignedRecords action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AssignOwnerToUnassignedRecordsActionParameters {
  Owner: string;
  UnassignedRecords: string;
}

/**
 * msdyn_AssignOwnerToUnassignedRecords action
 *
 * Unbound action
 */
export class msdyn_AssignOwnerToUnassignedRecordsAction implements Executable<msdyn_AssignOwnerToUnassignedRecordsResponse> {
  constructor(public readonly parameters: msdyn_AssignOwnerToUnassignedRecordsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AssignOwnerToUnassignedRecords`;

    const body = requestBody({
      Owner: this.parameters.Owner,
      UnassignedRecords: this.parameters.UnassignedRecords,
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

  async parseResponse(response: Response): Promise<msdyn_AssignOwnerToUnassignedRecordsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_AssignOwnerToUnassignedRecordsResponse;
  }
}
