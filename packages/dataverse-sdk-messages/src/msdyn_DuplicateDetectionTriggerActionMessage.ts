import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_DuplicateDetectionTriggerAction request message
 *
 * Web API Action: msdyn_DuplicateDetectionTriggerAction
 */
export class msdyn_DuplicateDetectionTriggerActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_DuplicateDetectionTriggerActionResponse>
{
  constructor(
    public baseRecordType: string,
    public baseRecordId: string
  ) {
    super("msdyn_DuplicateDetectionTriggerAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DuplicateDetectionTriggerAction`;

    const body: Record<string, unknown> = {
      BaseRecordType: this.baseRecordType,
      BaseRecordId: this.baseRecordId,
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

  async parseResponse(response: Response): Promise<msdyn_DuplicateDetectionTriggerActionResponse> {
    // No return value (204 No Content)
    return new msdyn_DuplicateDetectionTriggerActionResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      BaseRecordType: this.baseRecordType,
      BaseRecordId: this.baseRecordId,
    };
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
