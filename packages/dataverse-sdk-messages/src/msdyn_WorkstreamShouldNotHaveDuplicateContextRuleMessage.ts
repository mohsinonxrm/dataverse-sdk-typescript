import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResponse as msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResponseData } from "./types/index.js";

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
}

/**
 * msdyn_WorkstreamShouldNotHaveDuplicateContextRule response message
 */
export class msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResponseData) {
    super("msdyn_WorkstreamShouldNotHaveDuplicateContextRule");
  }

  static fromResponse(data: unknown): msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResponse {
    return new msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResponse(
      responseObject<msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResponseData>(data)
    );
  }
}
