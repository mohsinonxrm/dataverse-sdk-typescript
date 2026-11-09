import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ResolveEmailClassificationScopedCategories message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ResolveEmailClassificationScopedCategoriesRequestParameters {
  emailId: string;
  isSimulationMode?: boolean;
}

/**
 * msdyn_ResolveEmailClassificationScopedCategories request message
 *
 * Web API Action: msdyn_ResolveEmailClassificationScopedCategories
 */
export class msdyn_ResolveEmailClassificationScopedCategoriesRequest
  extends OrganizationRequest
  implements Executable<msdyn_ResolveEmailClassificationScopedCategoriesResponse>
{
  declare readonly Parameters: Readonly<msdyn_ResolveEmailClassificationScopedCategoriesRequestParameters>;

  constructor(parameters: msdyn_ResolveEmailClassificationScopedCategoriesRequestParameters) {
    super("msdyn_ResolveEmailClassificationScopedCategories", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ResolveEmailClassificationScopedCategories`;

    const body = requestBody({
      emailId: this.Parameters.emailId,
      isSimulationMode: this.Parameters.isSimulationMode,
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
    return msdyn_ResolveEmailClassificationScopedCategoriesResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_ResolveEmailClassificationScopedCategories action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ResolveEmailClassificationScopedCategoriesResult {
  "@odata.context"?: string;
  isRuleMatched: boolean;
  matchedRuleId: string;
}

/**
 * msdyn_ResolveEmailClassificationScopedCategories response message
 *
 * `result` is the value the msdyn_ResolveEmailClassificationScopedCategories action returns (see {@link msdyn_ResolveEmailClassificationScopedCategoriesResult}).
 */
export class msdyn_ResolveEmailClassificationScopedCategoriesResponse extends OrganizationResponse {
  constructor(public result: msdyn_ResolveEmailClassificationScopedCategoriesResult) {
    super("msdyn_ResolveEmailClassificationScopedCategories");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ResolveEmailClassificationScopedCategoriesResponse {
    return new msdyn_ResolveEmailClassificationScopedCategoriesResponse(
      data as msdyn_ResolveEmailClassificationScopedCategoriesResult
    );
  }
}
