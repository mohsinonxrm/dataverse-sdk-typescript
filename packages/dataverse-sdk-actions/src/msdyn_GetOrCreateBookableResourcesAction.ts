import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetOrCreateBookableResources action
 */
export interface msdyn_GetOrCreateBookableResourcesResponse {
  BookableResources: string;
}

/**
 * msdyn_GetOrCreateBookableResources action
 *
 * Unbound action
 */
export class msdyn_GetOrCreateBookableResourcesAction implements Executable<msdyn_GetOrCreateBookableResourcesResponse> {
  constructor(public readonly resources: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOrCreateBookableResources`;

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

  async parseResponse(response: Response): Promise<msdyn_GetOrCreateBookableResourcesResponse> {
    const data = await response.json();
    return data as msdyn_GetOrCreateBookableResourcesResponse;
  }
}
