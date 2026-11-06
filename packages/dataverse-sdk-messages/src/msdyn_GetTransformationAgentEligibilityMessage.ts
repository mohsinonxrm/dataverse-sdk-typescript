import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetTransformationAgentEligibility request message
 *
 * Web API Action: msdyn_GetTransformationAgentEligibility
 */
export class msdyn_GetTransformationAgentEligibilityRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetTransformationAgentEligibilityResponse>
{
  constructor() {
    super("msdyn_GetTransformationAgentEligibility");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetTransformationAgentEligibility`;

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
  ): Promise<msdyn_GetTransformationAgentEligibilityResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetTransformationAgentEligibilityResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetTransformationAgentEligibility action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetTransformationAgentEligibilityResult {
  "@odata.context"?: string;
  msdyn_disabledreason: string;
  msdyn_isenabled: boolean;
}

/**
 * msdyn_GetTransformationAgentEligibility response message
 *
 * `result` is the value the msdyn_GetTransformationAgentEligibility action returns (see {@link msdyn_GetTransformationAgentEligibilityResult}).
 */
export class msdyn_GetTransformationAgentEligibilityResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetTransformationAgentEligibilityResult) {
    super("msdyn_GetTransformationAgentEligibility");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetTransformationAgentEligibilityResponse {
    return new msdyn_GetTransformationAgentEligibilityResponse(
      data as msdyn_GetTransformationAgentEligibilityResult
    );
  }
}
