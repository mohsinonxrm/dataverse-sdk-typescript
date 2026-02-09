import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_BulkAITestRun action
 */
export interface msdyn_BulkAITestRunResponse {
  response: string;
}

/**
 * msdyn_BulkAITestRun action
 *
 * Unbound action
 */
export class msdyn_BulkAITestRunAction implements Executable<msdyn_BulkAITestRunResponse> {
  constructor(public readonly request: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_BulkAITestRun`;

    const body: Record<string, unknown> = {
      request: this.request,
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

  async parseResponse(response: Response): Promise<msdyn_BulkAITestRunResponse> {
    const data = await response.json();
    return data as msdyn_BulkAITestRunResponse;
  }
}
