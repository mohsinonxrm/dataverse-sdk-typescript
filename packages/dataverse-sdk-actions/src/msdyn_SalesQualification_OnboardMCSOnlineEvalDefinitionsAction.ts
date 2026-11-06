import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitions action
 */
export interface msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsResponse {
  ErrorMessage: string;
  IsSuccess: boolean;
}

/**
 * msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitions action
 *
 * Unbound action
 */
export class msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsAction implements Executable<msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitions`;

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
  ): Promise<msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsResponse;
    return (await response.json()) as msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsResponse;
  }
}
