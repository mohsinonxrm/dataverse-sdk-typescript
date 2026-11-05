import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetHierarchyData action
 */
export interface msdyn_GetHierarchyDataResponse {
  output: string;
}

/**
 * msdyn_GetHierarchyData action
 *
 * Unbound action
 */
export class msdyn_GetHierarchyDataAction implements Executable<msdyn_GetHierarchyDataResponse> {
  constructor(public readonly input: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetHierarchyData`;

    const body: Record<string, unknown> = {
      input: this.input,
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

  async parseResponse(response: Response): Promise<msdyn_GetHierarchyDataResponse> {
    const data = await response.json();
    return data as msdyn_GetHierarchyDataResponse;
  }
}
