import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ResolveEmailClassificationScopedCategories action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ResolveEmailClassificationScopedCategoriesResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_ResolveEmailClassificationScopedCategoriesResponse;
  }
}
