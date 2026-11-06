import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_GetTransformationAgentEligibility action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetTransformationAgentEligibilityResponse {
  "@odata.context"?: string;
  msdyn_disabledreason: string;
  msdyn_isenabled: boolean;
}

/**
 * msdyn_GetTransformationAgentEligibility action
 *
 * Unbound action
 */
export class msdyn_GetTransformationAgentEligibilityAction implements Executable<msdyn_GetTransformationAgentEligibilityResponse> {
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
    return (await response.json()) as msdyn_GetTransformationAgentEligibilityResponse;
  }
}
