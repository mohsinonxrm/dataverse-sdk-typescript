import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_AssignOwnerToUnassignedRecords action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_AssignOwnerToUnassignedRecordsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_AssignOwnerToUnassignedRecordsResponse;
  }
}
