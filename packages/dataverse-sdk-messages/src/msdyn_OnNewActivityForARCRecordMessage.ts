import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_OnNewActivityForARCRecord message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OnNewActivityForARCRecordRequestParameters {
  msdyn_sourceEntityReference: EntityReference | AnyEntityPayload;
  msdyn_primaryEntityReference: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_OnNewActivityForARCRecord request message
 *
 * Web API Action: msdyn_OnNewActivityForARCRecord
 */
export class msdyn_OnNewActivityForARCRecordRequest
  extends OrganizationRequest
  implements Executable<msdyn_OnNewActivityForARCRecordResponse>
{
  declare readonly Parameters: Readonly<msdyn_OnNewActivityForARCRecordRequestParameters>;

  constructor(parameters: msdyn_OnNewActivityForARCRecordRequestParameters) {
    super("msdyn_OnNewActivityForARCRecord", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OnNewActivityForARCRecord`;

    const body = requestBody({
      msdyn_sourceEntityReference: this.Parameters.msdyn_sourceEntityReference,
      msdyn_primaryEntityReference: this.Parameters.msdyn_primaryEntityReference,
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
    // No return value (204 No Content)
    return new msdyn_OnNewActivityForARCRecordResponse();
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
