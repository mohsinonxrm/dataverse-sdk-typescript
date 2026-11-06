import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_WorkstreamShouldHaveSessionTemplatesRule request message
 *
 * Web API Action: msdyn_WorkstreamShouldHaveSessionTemplatesRule
 */
export class msdyn_WorkstreamShouldHaveSessionTemplatesRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_WorkstreamShouldHaveSessionTemplatesRuleResponse>
{
  constructor() {
    super("msdyn_WorkstreamShouldHaveSessionTemplatesRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WorkstreamShouldHaveSessionTemplatesRule`;

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
  ): Promise<msdyn_WorkstreamShouldHaveSessionTemplatesRuleResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_WorkstreamShouldHaveSessionTemplatesRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_WorkstreamShouldHaveSessionTemplatesRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_WorkstreamShouldHaveSessionTemplatesRuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_WorkstreamShouldHaveSessionTemplatesRule response message
 *
 * `result` is the value the msdyn_WorkstreamShouldHaveSessionTemplatesRule action returns (see {@link msdyn_WorkstreamShouldHaveSessionTemplatesRuleResult}).
 */
export class msdyn_WorkstreamShouldHaveSessionTemplatesRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_WorkstreamShouldHaveSessionTemplatesRuleResult) {
    super("msdyn_WorkstreamShouldHaveSessionTemplatesRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_WorkstreamShouldHaveSessionTemplatesRuleResponse {
    return new msdyn_WorkstreamShouldHaveSessionTemplatesRuleResponse(
      data as msdyn_WorkstreamShouldHaveSessionTemplatesRuleResult
    );
  }
}
