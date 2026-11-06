import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetTransformationAgentEligibility action
 */
export interface msdyn_GetTransformationAgentEligibilityResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetTransformationAgentEligibilityResponse;
    return (await response.json()) as msdyn_GetTransformationAgentEligibilityResponse;
  }
}
