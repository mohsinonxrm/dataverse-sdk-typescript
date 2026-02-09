import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_WorkstreamCapacityShouldBeLessThanAgentsRule request message
 *
 * Web API Action: msdyn_WorkstreamCapacityShouldBeLessThanAgentsRule
 */
export class msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponse>
{
  constructor() {
    super("msdyn_WorkstreamCapacityShouldBeLessThanAgentsRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WorkstreamCapacityShouldBeLessThanAgentsRule`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponse> {
    const data = await response.json();
    return msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_WorkstreamCapacityShouldBeLessThanAgentsRule response message
 */
export class msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponse) {
    super("msdyn_WorkstreamCapacityShouldBeLessThanAgentsRule");
  }

  static fromResponse(data: unknown): msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponse {
    return new msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponse((data as any).value);
  }
}
