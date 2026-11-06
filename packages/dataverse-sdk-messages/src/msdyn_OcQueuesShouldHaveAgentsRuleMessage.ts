import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_OcQueuesShouldHaveAgentsRule request message
 *
 * Web API Action: msdyn_OcQueuesShouldHaveAgentsRule
 */
export class msdyn_OcQueuesShouldHaveAgentsRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_OcQueuesShouldHaveAgentsRuleResponse>
{
  constructor() {
    super("msdyn_OcQueuesShouldHaveAgentsRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OcQueuesShouldHaveAgentsRule`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_OcQueuesShouldHaveAgentsRuleResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_OcQueuesShouldHaveAgentsRuleResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_OcQueuesShouldHaveAgentsRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_OcQueuesShouldHaveAgentsRuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_OcQueuesShouldHaveAgentsRule response message
 *
 * `result` is the value the msdyn_OcQueuesShouldHaveAgentsRule action returns (see {@link msdyn_OcQueuesShouldHaveAgentsRuleResult}).
 */
export class msdyn_OcQueuesShouldHaveAgentsRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_OcQueuesShouldHaveAgentsRuleResult) {
    super("msdyn_OcQueuesShouldHaveAgentsRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_OcQueuesShouldHaveAgentsRuleResponse {
    return new msdyn_OcQueuesShouldHaveAgentsRuleResponse(
      data as msdyn_OcQueuesShouldHaveAgentsRuleResult
    );
  }
}
