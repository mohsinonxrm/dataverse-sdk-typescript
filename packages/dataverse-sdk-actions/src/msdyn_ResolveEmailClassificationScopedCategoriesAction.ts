import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ResolveEmailClassificationScopedCategories action
 */
export interface msdyn_ResolveEmailClassificationScopedCategoriesResponse {
  isRuleMatched: boolean;
  matchedRuleId: string;
}

/**
 * Parameters of the msdyn_ResolveEmailClassificationScopedCategories action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ResolveEmailClassificationScopedCategoriesActionParameters {
  emailId: string;
  isSimulationMode?: boolean;
}

/**
 * msdyn_ResolveEmailClassificationScopedCategories action
 *
 * Unbound action
 */
export class msdyn_ResolveEmailClassificationScopedCategoriesAction implements Executable<msdyn_ResolveEmailClassificationScopedCategoriesResponse> {
  constructor(
    public readonly parameters: msdyn_ResolveEmailClassificationScopedCategoriesActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ResolveEmailClassificationScopedCategories`;

    const body = requestBody({
      emailId: this.parameters.emailId,
      isSimulationMode: this.parameters.isSimulationMode,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_ResolveEmailClassificationScopedCategoriesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_ResolveEmailClassificationScopedCategoriesResponse;
    return (await response.json()) as msdyn_ResolveEmailClassificationScopedCategoriesResponse;
  }
}
