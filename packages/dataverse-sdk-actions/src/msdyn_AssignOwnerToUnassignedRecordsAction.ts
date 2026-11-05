import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_AssignOwnerToUnassignedRecords action
 */
export interface msdyn_AssignOwnerToUnassignedRecordsResponse {
  AssignmentResults: string;
}

/**
 * msdyn_AssignOwnerToUnassignedRecords action
 *
 * Unbound action
 */
export class msdyn_AssignOwnerToUnassignedRecordsAction implements Executable<msdyn_AssignOwnerToUnassignedRecordsResponse> {
  constructor(
    public readonly owner: string,
    public readonly unassignedRecords: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AssignOwnerToUnassignedRecords`;

    const body: Record<string, unknown> = {
      Owner: this.owner,
      UnassignedRecords: this.unassignedRecords,
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

  async parseResponse(response: Response): Promise<msdyn_AssignOwnerToUnassignedRecordsResponse> {
    const data = await response.json();
    return data as msdyn_AssignOwnerToUnassignedRecordsResponse;
  }
}
