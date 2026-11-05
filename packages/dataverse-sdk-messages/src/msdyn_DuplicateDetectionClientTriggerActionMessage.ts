import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_DuplicateDetectionClientTriggerAction request message
 *
 * Web API Action: msdyn_DuplicateDetectionClientTriggerAction
 */
export class msdyn_DuplicateDetectionClientTriggerActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_DuplicateDetectionClientTriggerActionResponse>
{
  constructor(public inputData: string) {
    super("msdyn_DuplicateDetectionClientTriggerAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DuplicateDetectionClientTriggerAction`;

    const body: Record<string, unknown> = {
      InputData: this.inputData,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_DuplicateDetectionClientTriggerActionResponse> {
    // No return value (204 No Content)
    return new msdyn_DuplicateDetectionClientTriggerActionResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      InputData: this.inputData,
    };
  }
}

/**
 * msdyn_DuplicateDetectionClientTriggerAction response message
 */
export class msdyn_DuplicateDetectionClientTriggerActionResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_DuplicateDetectionClientTriggerAction");
  }

  static fromResponse(_data: unknown): msdyn_DuplicateDetectionClientTriggerActionResponse {
    return new msdyn_DuplicateDetectionClientTriggerActionResponse();
  }
}
