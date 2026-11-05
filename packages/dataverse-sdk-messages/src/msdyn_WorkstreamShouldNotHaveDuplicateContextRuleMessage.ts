import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_WorkstreamShouldNotHaveDuplicateContextRule request message
 *
 * Web API Action: msdyn_WorkstreamShouldNotHaveDuplicateContextRule
 */
export class msdyn_WorkstreamShouldNotHaveDuplicateContextRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResponse>
{
  constructor() {
    super("msdyn_WorkstreamShouldNotHaveDuplicateContextRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WorkstreamShouldNotHaveDuplicateContextRule`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResponse> {
    const data = await response.json();
    return msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_WorkstreamShouldNotHaveDuplicateContextRule response message
 */
export class msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResponse) {
    super("msdyn_WorkstreamShouldNotHaveDuplicateContextRule");
  }

  static fromResponse(data: unknown): msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResponse {
    return new msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResponse((data as any).value);
  }
}
