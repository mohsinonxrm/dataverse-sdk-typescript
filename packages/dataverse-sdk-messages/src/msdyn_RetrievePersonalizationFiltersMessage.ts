import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_RetrievePersonalizationFiltersResponse> {
    const data = await response.json();
    return msdyn_RetrievePersonalizationFiltersResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      AttributesToFilter: this.attributesToFilter,
    };
  }
}

/**
 * msdyn_RetrievePersonalizationFilters response message
 */
export class msdyn_RetrievePersonalizationFiltersResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrievePersonalizationFiltersResponse) {
    super("msdyn_RetrievePersonalizationFilters");
  }

  static fromResponse(data: unknown): msdyn_RetrievePersonalizationFiltersResponse {
    return new msdyn_RetrievePersonalizationFiltersResponse((data as any).value);
  }
}
