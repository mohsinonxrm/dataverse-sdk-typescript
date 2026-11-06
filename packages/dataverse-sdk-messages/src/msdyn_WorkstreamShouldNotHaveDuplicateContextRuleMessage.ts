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
    // The body is the complex value, with its @odata.context
    return msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_WorkstreamShouldNotHaveDuplicateContextRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_WorkstreamShouldNotHaveDuplicateContextRule response message
 *
 * `result` is the value the msdyn_WorkstreamShouldNotHaveDuplicateContextRule action returns (see {@link msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResult}).
 */
export class msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResult) {
    super("msdyn_WorkstreamShouldNotHaveDuplicateContextRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResponse {
    return new msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResponse(
      data as msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResult
    );
  }
}
