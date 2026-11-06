import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CreateActionFlow message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateActionFlowRequestParameters {
  SLAId: string;
}

/**
 * msdyn_CreateActionFlow request message
 *
 * Web API Action: msdyn_CreateActionFlow
 */
export class msdyn_CreateActionFlowRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateActionFlowResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateActionFlowRequestParameters>;

  constructor(parameters: msdyn_CreateActionFlowRequestParameters) {
    super("msdyn_CreateActionFlow", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateActionFlow`;

    const body = requestBody({
      SLAId: this.Parameters.SLAId,
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

  async parseResponse(response: Response): Promise<msdyn_CreateActionFlowResponse> {
    // No return value (204 No Content)
    return new msdyn_CreateActionFlowResponse();
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
