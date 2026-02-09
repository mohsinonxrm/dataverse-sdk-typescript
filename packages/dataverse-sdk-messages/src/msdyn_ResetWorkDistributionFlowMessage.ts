import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ResetWorkDistributionFlow request message
 *
 * Web API Action: msdyn_ResetWorkDistributionFlow
 */
export class msdyn_ResetWorkDistributionFlowRequest
  extends OrganizationRequest
  implements Executable<msdyn_ResetWorkDistributionFlowResponse>
{
  constructor(public shouldMaintainCustomizations: boolean) {
    super("msdyn_ResetWorkDistributionFlow");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ResetWorkDistributionFlow`;

    const body: Record<string, unknown> = {
      ShouldMaintainCustomizations: this.shouldMaintainCustomizations,
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

  async parseResponse(response: Response): Promise<msdyn_ResetWorkDistributionFlowResponse> {
    // No return value (204 No Content)
    return new msdyn_ResetWorkDistributionFlowResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ShouldMaintainCustomizations: this.shouldMaintainCustomizations,
    };
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
