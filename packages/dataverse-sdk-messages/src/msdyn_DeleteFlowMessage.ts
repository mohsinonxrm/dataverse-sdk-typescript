import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_DeleteFlow request message
 *
 * Web API Action: msdyn_DeleteFlow
 */
export class msdyn_DeleteFlowRequest
  extends OrganizationRequest
  implements Executable<msdyn_DeleteFlowResponse>
{
  constructor() {
    super("msdyn_DeleteFlow");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DeleteFlow`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_DeleteFlowResponse> {
    // No return value (204 No Content)
    return new msdyn_DeleteFlowResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_DeleteFlow response message
 */
export class msdyn_DeleteFlowResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_DeleteFlow");
  }

  static fromResponse(_data: unknown): msdyn_DeleteFlowResponse {
    return new msdyn_DeleteFlowResponse();
  }
}
