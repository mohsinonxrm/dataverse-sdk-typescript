import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetSubjectHierarchyData action
 */
export interface msdyn_GetSubjectHierarchyDataResponse {
  output: string;
}

/**
 * msdyn_GetSubjectHierarchyData action
 *
 * Unbound action
 */
export class msdyn_GetSubjectHierarchyDataAction implements Executable<msdyn_GetSubjectHierarchyDataResponse> {
  constructor(public readonly input: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSubjectHierarchyData`;

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

  async parseResponse(response: Response): Promise<msdyn_GetSubjectHierarchyDataResponse> {
    const data = await response.json();
    return data as msdyn_GetSubjectHierarchyDataResponse;
  }
}
