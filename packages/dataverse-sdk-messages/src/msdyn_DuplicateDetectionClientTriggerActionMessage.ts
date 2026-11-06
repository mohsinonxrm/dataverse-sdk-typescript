import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_DuplicateDetectionClientTriggerAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DuplicateDetectionClientTriggerActionRequestParameters {
  InputData?: string;
}

/**
 * msdyn_DuplicateDetectionClientTriggerAction request message
 *
 * Web API Action: msdyn_DuplicateDetectionClientTriggerAction
 */
export class msdyn_DuplicateDetectionClientTriggerActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_DuplicateDetectionClientTriggerActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_DuplicateDetectionClientTriggerActionRequestParameters>;

  constructor(parameters: msdyn_DuplicateDetectionClientTriggerActionRequestParameters = {}) {
    super("msdyn_DuplicateDetectionClientTriggerAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DuplicateDetectionClientTriggerAction`;

    const body = requestBody({
      InputData: this.Parameters.InputData,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_DuplicateDetectionClientTriggerActionResponse> {
    // No return value (204 No Content)
    return new msdyn_DuplicateDetectionClientTriggerActionResponse();
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
