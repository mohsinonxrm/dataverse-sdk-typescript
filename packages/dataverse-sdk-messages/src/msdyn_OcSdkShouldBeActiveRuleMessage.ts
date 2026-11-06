import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_OcSdkShouldBeActiveRule request message
 *
 * Web API Action: msdyn_OcSdkShouldBeActiveRule
 */
export class msdyn_OcSdkShouldBeActiveRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_OcSdkShouldBeActiveRuleResponse>
{
  constructor() {
    super("msdyn_OcSdkShouldBeActiveRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OcSdkShouldBeActiveRule`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_OcSdkShouldBeActiveRuleResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_OcSdkShouldBeActiveRuleResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_OcSdkShouldBeActiveRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_OcSdkShouldBeActiveRuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_OcSdkShouldBeActiveRule response message
 *
 * `result` is the value the msdyn_OcSdkShouldBeActiveRule action returns (see {@link msdyn_OcSdkShouldBeActiveRuleResult}).
 */
export class msdyn_OcSdkShouldBeActiveRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_OcSdkShouldBeActiveRuleResult) {
    super("msdyn_OcSdkShouldBeActiveRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_OcSdkShouldBeActiveRuleResponse {
    return new msdyn_OcSdkShouldBeActiveRuleResponse(data as msdyn_OcSdkShouldBeActiveRuleResult);
  }
}
