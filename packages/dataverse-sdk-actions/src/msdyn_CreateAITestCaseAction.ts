import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CreateAITestCase action
 */
export interface msdyn_CreateAITestCaseResponse {
  response: string;
}

/**
 * msdyn_CreateAITestCase action
 *
 * Unbound action
 */
export class msdyn_CreateAITestCaseAction implements Executable<msdyn_CreateAITestCaseResponse> {
  constructor(public readonly request: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateAITestCase`;

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

  async parseResponse(response: Response): Promise<msdyn_CreateAITestCaseResponse> {
    const data = await response.json();
    return data as msdyn_CreateAITestCaseResponse;
  }
}
