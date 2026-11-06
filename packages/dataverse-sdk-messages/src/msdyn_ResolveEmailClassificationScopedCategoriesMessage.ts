import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ResolveEmailClassificationScopedCategoriesResponse as msdyn_ResolveEmailClassificationScopedCategoriesResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_ResolveEmailClassificationScopedCategoriesResponse.fromResponse({});
    return msdyn_ResolveEmailClassificationScopedCategoriesResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_ResolveEmailClassificationScopedCategories response message
 */
export class msdyn_ResolveEmailClassificationScopedCategoriesResponse extends OrganizationResponse {
  constructor(public result: msdyn_ResolveEmailClassificationScopedCategoriesResponseData) {
    super("msdyn_ResolveEmailClassificationScopedCategories");
  }

  static fromResponse(data: unknown): msdyn_ResolveEmailClassificationScopedCategoriesResponse {
    return new msdyn_ResolveEmailClassificationScopedCategoriesResponse(
      responseObject<msdyn_ResolveEmailClassificationScopedCategoriesResponseData>(data)
    );
  }
}
