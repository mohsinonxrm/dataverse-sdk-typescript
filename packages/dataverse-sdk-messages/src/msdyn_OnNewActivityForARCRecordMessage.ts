import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_OnNewActivityForARCRecord request message
 *
 * Web API Action: msdyn_OnNewActivityForARCRecord
 */
export class msdyn_OnNewActivityForARCRecordRequest
  extends OrganizationRequest
  implements Executable<msdyn_OnNewActivityForARCRecordResponse>
{
  constructor(
    public msdyn_primaryEntityReference: EntityReference,
    public msdyn_sourceEntityReference: EntityReference
  ) {
    super("msdyn_OnNewActivityForARCRecord");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OnNewActivityForARCRecord`;

    const body: Record<string, unknown> = {
      msdyn_primaryEntityReference: this.msdyn_primaryEntityReference,
      msdyn_sourceEntityReference: this.msdyn_sourceEntityReference,
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

  async parseResponse(response: Response): Promise<msdyn_OnNewActivityForARCRecordResponse> {
    // No return value (204 No Content)
    return new msdyn_OnNewActivityForARCRecordResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_primaryEntityReference: this.msdyn_primaryEntityReference,
      msdyn_sourceEntityReference: this.msdyn_sourceEntityReference,
    };
  }
}

/**
 * msdyn_OnNewActivityForARCRecord response message
 */
export class msdyn_OnNewActivityForARCRecordResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_OnNewActivityForARCRecord");
  }

  static fromResponse(_data: unknown): msdyn_OnNewActivityForARCRecordResponse {
    return new msdyn_OnNewActivityForARCRecordResponse();
  }
}
