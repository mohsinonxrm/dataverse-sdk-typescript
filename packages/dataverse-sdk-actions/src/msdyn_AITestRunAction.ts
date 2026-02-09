import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_AITestRun action
 */
export interface msdyn_AITestRunResponse {
  response: string;
}

/**
 * msdyn_AITestRun action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aitestcase)
 */
export class msdyn_AITestRunAction implements Executable<msdyn_AITestRunResponse> {
  constructor(
    public readonly msdyn_aitestcaseId: string,
    public readonly request: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aitestcases(${this.msdyn_aitestcaseId})/Microsoft.Dynamics.CRM.msdyn_AITestRun`;

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

  async parseResponse(response: Response): Promise<msdyn_AITestRunResponse> {
    const data = await response.json();
    return data as msdyn_AITestRunResponse;
  }
}
