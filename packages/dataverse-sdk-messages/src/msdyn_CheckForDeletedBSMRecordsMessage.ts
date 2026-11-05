import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckForDeletedBSMRecordsResponse as msdyn_CheckForDeletedBSMRecordsResponseData } from "./types/index.js";

/**
 * msdyn_CheckForDeletedBSMRecords request message
 *
 * Web API Action: msdyn_CheckForDeletedBSMRecords
 */
export class msdyn_CheckForDeletedBSMRecordsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForDeletedBSMRecordsResponse>
{
  constructor() {
    super("msdyn_CheckForDeletedBSMRecords");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForDeletedBSMRecords`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckForDeletedBSMRecordsResponse> {
    const data = await response.json();
    return msdyn_CheckForDeletedBSMRecordsResponse.fromResponse(data);
  }
}

/**
 * msdyn_CheckForDeletedBSMRecords response message
 */
export class msdyn_CheckForDeletedBSMRecordsResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForDeletedBSMRecordsResponseData) {
    super("msdyn_CheckForDeletedBSMRecords");
  }

  static fromResponse(data: unknown): msdyn_CheckForDeletedBSMRecordsResponse {
    return new msdyn_CheckForDeletedBSMRecordsResponse(
      responseObject<msdyn_CheckForDeletedBSMRecordsResponseData>(data)
    );
  }
}
