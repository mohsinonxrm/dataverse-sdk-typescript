import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CreateActionFlow request message
 *
 * Web API Action: msdyn_CreateActionFlow
 */
export class msdyn_CreateActionFlowRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateActionFlowResponse>
{
  constructor(public sLAId: string) {
    super("msdyn_CreateActionFlow");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateActionFlow`;

    const body: Record<string, unknown> = {
      SLAId: this.sLAId,
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

  async parseResponse(response: Response): Promise<msdyn_CreateActionFlowResponse> {
    // No return value (204 No Content)
    return new msdyn_CreateActionFlowResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SLAId: this.sLAId,
    };
  }
}

/**
 * msdyn_CreateActionFlow response message
 */
export class msdyn_CreateActionFlowResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CreateActionFlow");
  }

  static fromResponse(_data: unknown): msdyn_CreateActionFlowResponse {
    return new msdyn_CreateActionFlowResponse();
  }
}
