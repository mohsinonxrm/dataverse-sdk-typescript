import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetChildResources action
 */
export interface msdyn_GetChildResourcesResponse {
  ChildResources: string;
}

/**
 * msdyn_GetChildResources action
 *
 * Unbound action
 */
export class msdyn_GetChildResourcesAction implements Executable<msdyn_GetChildResourcesResponse> {
  constructor(
    public readonly resourceIds: string,
    public readonly ufxParameter: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetChildResources`;

    const body: Record<string, unknown> = {
      ResourceIds: this.resourceIds,
      UfxParameter: this.ufxParameter,
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

  async parseResponse(response: Response): Promise<msdyn_GetChildResourcesResponse> {
    const data = await response.json();
    return data as msdyn_GetChildResourcesResponse;
  }
}
