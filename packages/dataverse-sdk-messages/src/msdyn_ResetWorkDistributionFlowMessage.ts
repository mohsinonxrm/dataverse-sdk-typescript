import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ResetWorkDistributionFlow message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ResetWorkDistributionFlowRequestParameters {
  ShouldMaintainCustomizations: boolean;
}

/**
 * msdyn_ResetWorkDistributionFlow request message
 *
 * Web API Action: msdyn_ResetWorkDistributionFlow
 */
export class msdyn_ResetWorkDistributionFlowRequest
  extends OrganizationRequest
  implements Executable<msdyn_ResetWorkDistributionFlowResponse>
{
  declare readonly Parameters: Readonly<msdyn_ResetWorkDistributionFlowRequestParameters>;

  constructor(parameters: msdyn_ResetWorkDistributionFlowRequestParameters) {
    super("msdyn_ResetWorkDistributionFlow", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ResetWorkDistributionFlow`;

    const body = requestBody({
      ShouldMaintainCustomizations: this.Parameters.ShouldMaintainCustomizations,
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

  async parseResponse(response: Response): Promise<msdyn_ResetWorkDistributionFlowResponse> {
    // No return value (204 No Content)
    return new msdyn_ResetWorkDistributionFlowResponse();
  }
}

/**
 * msdyn_ResetWorkDistributionFlow response message
 */
export class msdyn_ResetWorkDistributionFlowResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ResetWorkDistributionFlow");
  }

  static fromResponse(_data: unknown): msdyn_ResetWorkDistributionFlowResponse {
    return new msdyn_ResetWorkDistributionFlowResponse();
  }
}
