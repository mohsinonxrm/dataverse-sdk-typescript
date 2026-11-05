import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_RetrievePersonalizationFiltersResponse as msdyn_RetrievePersonalizationFiltersResponseData } from "./types/index.js";

/**
 * msdyn_RetrievePersonalizationFilters request message
 *
 * Web API Action: msdyn_RetrievePersonalizationFilters
 */
export class msdyn_RetrievePersonalizationFiltersRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrievePersonalizationFiltersResponse>
{
  constructor(public attributesToFilter: string) {
    super("msdyn_RetrievePersonalizationFilters");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrievePersonalizationFilters`;

    const body: Record<string, unknown> = {
      AttributesToFilter: this.attributesToFilter,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_RetrievePersonalizationFiltersResponse> {
    const data = await response.json();
    return msdyn_RetrievePersonalizationFiltersResponse.fromResponse(data);
  }
}

/**
 * msdyn_RetrievePersonalizationFilters response message
 */
export class msdyn_RetrievePersonalizationFiltersResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrievePersonalizationFiltersResponseData) {
    super("msdyn_RetrievePersonalizationFilters");
  }

  static fromResponse(data: unknown): msdyn_RetrievePersonalizationFiltersResponse {
    return new msdyn_RetrievePersonalizationFiltersResponse(
      responseObject<msdyn_RetrievePersonalizationFiltersResponseData>(data)
    );
  }
}
