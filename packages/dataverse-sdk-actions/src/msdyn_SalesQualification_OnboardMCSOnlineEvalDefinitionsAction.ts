import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitions action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsResponse;
  }
}
