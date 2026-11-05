import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_RetrievePersonalizationFilters action
 */
export interface msdyn_RetrievePersonalizationFiltersResponse {
  Result: string;
}

/**
 * msdyn_RetrievePersonalizationFilters action
 *
 * Unbound action
 */
export class msdyn_RetrievePersonalizationFiltersAction implements Executable<msdyn_RetrievePersonalizationFiltersResponse> {
  constructor(public readonly attributesToFilter: string) {}

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
    return data as msdyn_RetrievePersonalizationFiltersResponse;
  }
}
