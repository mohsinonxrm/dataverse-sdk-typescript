import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_AssignOwnerToUnassignedRecords request message
 *
 * Web API Action: msdyn_AssignOwnerToUnassignedRecords
 */
export class msdyn_AssignOwnerToUnassignedRecordsRequest
  extends OrganizationRequest
  implements Executable<msdyn_AssignOwnerToUnassignedRecordsResponse>
{
  constructor(
    public owner: string,
    public unassignedRecords: string
  ) {
    super("msdyn_AssignOwnerToUnassignedRecords");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_AssignOwnerToUnassignedRecordsResponse> {
    const data = await response.json();
    return msdyn_AssignOwnerToUnassignedRecordsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Owner: this.owner,
      UnassignedRecords: this.unassignedRecords,
    };
  }
}

/**
 * msdyn_AssignOwnerToUnassignedRecords response message
 */
export class msdyn_AssignOwnerToUnassignedRecordsResponse extends OrganizationResponse {
  constructor(public result: msdyn_AssignOwnerToUnassignedRecordsResponse) {
    super("msdyn_AssignOwnerToUnassignedRecords");
  }

  static fromResponse(data: unknown): msdyn_AssignOwnerToUnassignedRecordsResponse {
    return new msdyn_AssignOwnerToUnassignedRecordsResponse((data as any).value);
  }
}
