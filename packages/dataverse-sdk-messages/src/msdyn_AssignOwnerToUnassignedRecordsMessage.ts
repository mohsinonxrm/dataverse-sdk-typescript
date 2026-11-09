import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_AssignOwnerToUnassignedRecords message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AssignOwnerToUnassignedRecordsRequestParameters {
  Owner: string;
  UnassignedRecords: string;
}

/**
 * msdyn_AssignOwnerToUnassignedRecords request message
 *
 * Web API Action: msdyn_AssignOwnerToUnassignedRecords
 */
export class msdyn_AssignOwnerToUnassignedRecordsRequest
  extends OrganizationRequest
  implements Executable<msdyn_AssignOwnerToUnassignedRecordsResponse>
{
  declare readonly Parameters: Readonly<msdyn_AssignOwnerToUnassignedRecordsRequestParameters>;

  constructor(parameters: msdyn_AssignOwnerToUnassignedRecordsRequestParameters) {
    super("msdyn_AssignOwnerToUnassignedRecords", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AssignOwnerToUnassignedRecords`;

    const body = requestBody({
      Owner: this.Parameters.Owner,
      UnassignedRecords: this.Parameters.UnassignedRecords,
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
    return msdyn_AssignOwnerToUnassignedRecordsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_AssignOwnerToUnassignedRecords action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_AssignOwnerToUnassignedRecordsResult {
  "@odata.context"?: string;
  AssignmentResults: string;
}

/**
 * msdyn_AssignOwnerToUnassignedRecords response message
 *
 * `result` is the value the msdyn_AssignOwnerToUnassignedRecords action returns (see {@link msdyn_AssignOwnerToUnassignedRecordsResult}).
 */
export class msdyn_AssignOwnerToUnassignedRecordsResponse extends OrganizationResponse {
  constructor(public result: msdyn_AssignOwnerToUnassignedRecordsResult) {
    super("msdyn_AssignOwnerToUnassignedRecords");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_AssignOwnerToUnassignedRecordsResponse {
    return new msdyn_AssignOwnerToUnassignedRecordsResponse(
      data as msdyn_AssignOwnerToUnassignedRecordsResult
    );
  }
}
