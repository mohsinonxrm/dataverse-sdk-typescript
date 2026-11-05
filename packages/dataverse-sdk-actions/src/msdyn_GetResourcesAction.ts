import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetResources action
 */
export interface msdyn_GetResourcesResponse {
  ResourceData: string;
}

/**
 * msdyn_GetResources action
 *
 * Unbound action
 */
export class msdyn_GetResourcesAction implements Executable<msdyn_GetResourcesResponse> {
  constructor(
    public readonly page: number,
    public readonly pageSize: number,
    public readonly queryString: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetResources`;

    const body: Record<string, unknown> = {
      Page: this.page,
      PageSize: this.pageSize,
      QueryString: this.queryString,
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

  async parseResponse(response: Response): Promise<msdyn_GetResourcesResponse> {
    const data = await response.json();
    return data as msdyn_GetResourcesResponse;
  }
}
