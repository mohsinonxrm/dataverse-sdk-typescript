import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetBookableResources action
 */
export interface msdyn_GetBookableResourcesResponse {
  BookableResources: string;
}

/**
 * msdyn_GetBookableResources action
 *
 * Unbound action
 */
export class msdyn_GetBookableResourcesAction implements Executable<msdyn_GetBookableResourcesResponse> {
  constructor(public readonly resources: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetBookableResources`;

    const body: Record<string, unknown> = {
      Resources: this.resources,
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

  async parseResponse(response: Response): Promise<msdyn_GetBookableResourcesResponse> {
    const data = await response.json();
    return data as msdyn_GetBookableResourcesResponse;
  }
}
