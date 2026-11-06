import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_DuplicateDetectionTriggerAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DuplicateDetectionTriggerActionRequestParameters {
  BaseRecordType?: string;
  BaseRecordId?: string;
}

/**
 * msdyn_DuplicateDetectionTriggerAction request message
 *
 * Web API Action: msdyn_DuplicateDetectionTriggerAction
 */
export class msdyn_DuplicateDetectionTriggerActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_DuplicateDetectionTriggerActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_DuplicateDetectionTriggerActionRequestParameters>;

  constructor(parameters: msdyn_DuplicateDetectionTriggerActionRequestParameters = {}) {
    super("msdyn_DuplicateDetectionTriggerAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DuplicateDetectionTriggerAction`;

    const body = requestBody({
      BaseRecordType: this.Parameters.BaseRecordType,
      BaseRecordId: this.Parameters.BaseRecordId,
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

  async parseResponse(response: Response): Promise<msdyn_DuplicateDetectionTriggerActionResponse> {
    // No return value (204 No Content)
    return new msdyn_DuplicateDetectionTriggerActionResponse();
  }
}

/**
 * msdyn_DuplicateDetectionTriggerAction response message
 */
export class msdyn_DuplicateDetectionTriggerActionResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_DuplicateDetectionTriggerAction");
  }

  static fromResponse(_data: unknown): msdyn_DuplicateDetectionTriggerActionResponse {
    return new msdyn_DuplicateDetectionTriggerActionResponse();
  }
}
