import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_OcServiceEndpointShouldBeConfiguredRule request message
 *
 * Web API Action: msdyn_OcServiceEndpointShouldBeConfiguredRule
 */
export class msdyn_OcServiceEndpointShouldBeConfiguredRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_OcServiceEndpointShouldBeConfiguredRuleResponse>
{
  constructor() {
    super("msdyn_OcServiceEndpointShouldBeConfiguredRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OcServiceEndpointShouldBeConfiguredRule`;

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
  ): Promise<msdyn_OcServiceEndpointShouldBeConfiguredRuleResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_OcServiceEndpointShouldBeConfiguredRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_OcServiceEndpointShouldBeConfiguredRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_OcServiceEndpointShouldBeConfiguredRuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_OcServiceEndpointShouldBeConfiguredRule response message
 *
 * `result` is the value the msdyn_OcServiceEndpointShouldBeConfiguredRule action returns (see {@link msdyn_OcServiceEndpointShouldBeConfiguredRuleResult}).
 */
export class msdyn_OcServiceEndpointShouldBeConfiguredRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_OcServiceEndpointShouldBeConfiguredRuleResult) {
    super("msdyn_OcServiceEndpointShouldBeConfiguredRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_OcServiceEndpointShouldBeConfiguredRuleResponse {
    return new msdyn_OcServiceEndpointShouldBeConfiguredRuleResponse(
      data as msdyn_OcServiceEndpointShouldBeConfiguredRuleResult
    );
  }
}
