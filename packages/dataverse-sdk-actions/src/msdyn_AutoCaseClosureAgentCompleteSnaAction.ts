import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_AutoCaseClosureAgentCompleteSna action
 */
export interface msdyn_AutoCaseClosureAgentCompleteSnaResponse {
  // No content returned
}

/**
 * msdyn_AutoCaseClosureAgentCompleteSna action
 *
 * Unbound action
 */
export class msdyn_AutoCaseClosureAgentCompleteSnaAction implements Executable<msdyn_AutoCaseClosureAgentCompleteSnaResponse> {
  constructor(public readonly msdyn_payload: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutoCaseClosureAgentCompleteSna`;

    const body: Record<string, unknown> = {
      msdyn_payload: this.msdyn_payload,
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

  async parseResponse(response: Response): Promise<msdyn_AutoCaseClosureAgentCompleteSnaResponse> {
    // No return value (204 No Content)
    return {};
  }
}
