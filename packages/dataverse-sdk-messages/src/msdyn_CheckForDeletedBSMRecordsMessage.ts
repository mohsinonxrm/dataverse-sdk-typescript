import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckForDeletedBSMRecordsResponse> {
    const data = await response.json();
    return msdyn_CheckForDeletedBSMRecordsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CheckForDeletedBSMRecords response message
 */
export class msdyn_CheckForDeletedBSMRecordsResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForDeletedBSMRecordsResponse) {
    super("msdyn_CheckForDeletedBSMRecords");
  }

  static fromResponse(data: unknown): msdyn_CheckForDeletedBSMRecordsResponse {
    return new msdyn_CheckForDeletedBSMRecordsResponse((data as any).value);
  }
}
