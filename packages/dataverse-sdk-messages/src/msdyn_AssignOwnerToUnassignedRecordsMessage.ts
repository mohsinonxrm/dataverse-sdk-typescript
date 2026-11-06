import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_AssignOwnerToUnassignedRecordsResponse as msdyn_AssignOwnerToUnassignedRecordsResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_AssignOwnerToUnassignedRecordsResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_AssignOwnerToUnassignedRecords response message
 */
export class msdyn_AssignOwnerToUnassignedRecordsResponse extends OrganizationResponse {
  constructor(public result: msdyn_AssignOwnerToUnassignedRecordsResponseData) {
    super("msdyn_AssignOwnerToUnassignedRecords");
  }

  static fromResponse(data: unknown): msdyn_AssignOwnerToUnassignedRecordsResponse {
    return new msdyn_AssignOwnerToUnassignedRecordsResponse(
      responseObject<msdyn_AssignOwnerToUnassignedRecordsResponseData>(data)
    );
  }
}
