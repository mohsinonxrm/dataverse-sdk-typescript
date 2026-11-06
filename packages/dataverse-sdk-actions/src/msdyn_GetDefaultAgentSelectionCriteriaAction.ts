import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetDefaultAgentSelectionCriteria action
 */
export interface msdyn_GetDefaultAgentSelectionCriteriaResponse {
  SelectionCriteria: string;
  Success: boolean;
}

/**
 * msdyn_GetDefaultAgentSelectionCriteria action
 *
 * Unbound action
 */
export class msdyn_GetDefaultAgentSelectionCriteriaAction implements Executable<msdyn_GetDefaultAgentSelectionCriteriaResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetDefaultAgentSelectionCriteria`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetDefaultAgentSelectionCriteriaResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetDefaultAgentSelectionCriteriaResponse;
    return (await response.json()) as msdyn_GetDefaultAgentSelectionCriteriaResponse;
  }
}
