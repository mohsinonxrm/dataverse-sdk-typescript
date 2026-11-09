import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_GetDefaultAgentSelectionCriteria action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetDefaultAgentSelectionCriteriaResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetDefaultAgentSelectionCriteriaResponse;
  }
}
