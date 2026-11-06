import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_WorkstreamShouldHaveNotificationTemplatesRule request message
 *
 * Web API Action: msdyn_WorkstreamShouldHaveNotificationTemplatesRule
 */
export class msdyn_WorkstreamShouldHaveNotificationTemplatesRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResponse>
{
  constructor() {
    super("msdyn_WorkstreamShouldHaveNotificationTemplatesRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WorkstreamShouldHaveNotificationTemplatesRule`;

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
  ): Promise<msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_WorkstreamShouldHaveNotificationTemplatesRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_WorkstreamShouldHaveNotificationTemplatesRule response message
 *
 * `result` is the value the msdyn_WorkstreamShouldHaveNotificationTemplatesRule action returns (see {@link msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResult}).
 */
export class msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResult) {
    super("msdyn_WorkstreamShouldHaveNotificationTemplatesRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResponse {
    return new msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResponse(
      data as msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResult
    );
  }
}
