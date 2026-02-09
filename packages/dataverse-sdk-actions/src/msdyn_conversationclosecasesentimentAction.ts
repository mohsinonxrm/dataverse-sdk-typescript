import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_conversationclosecasesentiment action
 */
export interface msdyn_conversationclosecasesentimentResponse {
  // No content returned
}

/**
 * msdyn_conversationclosecasesentiment action
 *
 * Unbound action
 */
export class msdyn_conversationclosecasesentimentAction implements Executable<msdyn_conversationclosecasesentimentResponse> {
  constructor(public readonly liveWorkItemGuid: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_conversationclosecasesentiment`;

    const body: Record<string, unknown> = {
      LiveWorkItemGuid: this.liveWorkItemGuid,
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

  async parseResponse(response: Response): Promise<msdyn_conversationclosecasesentimentResponse> {
    // No return value (204 No Content)
    return {};
  }
}
