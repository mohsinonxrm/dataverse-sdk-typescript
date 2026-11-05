import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from Analyze action
 */
export interface AnalyzeResponse {
  response: string;
}

/**
 * Analyze action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_pminferredtask)
 */
export class AnalyzeAction implements Executable<AnalyzeResponse> {
  constructor(
    public readonly msdyn_pminferredtaskId: string,
    public readonly version: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_pminferredtasks(${this.msdyn_pminferredtaskId})/Microsoft.Dynamics.CRM.Analyze`;

    const body: Record<string, unknown> = {
      version: this.version,
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

  async parseResponse(response: Response): Promise<AnalyzeResponse> {
    const data = await response.json();
    return data as AnalyzeResponse;
  }
}
