import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_PublishAIModel request message
 *
 * Web API Action: msdyn_PublishAIModel
 */
export class msdyn_PublishAIModelRequest
  extends OrganizationRequest
  implements Executable<msdyn_PublishAIModelResponse>
{
  constructor(public msdyn_ocsimltrainingId: string) {
    super("msdyn_PublishAIModel");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocsimltrainings(${this.msdyn_ocsimltrainingId})/Microsoft.Dynamics.CRM.msdyn_PublishAIModel`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_PublishAIModelResponse> {
    // No return value (204 No Content)
    return new msdyn_PublishAIModelResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_ocsimltrainingId,
    };
  }
}

/**
 * msdyn_PublishAIModel response message
 */
export class msdyn_PublishAIModelResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_PublishAIModel");
  }

  static fromResponse(_data: unknown): msdyn_PublishAIModelResponse {
    return new msdyn_PublishAIModelResponse();
  }
}
