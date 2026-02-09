import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from pm_CreateProcess action
 */
export interface pm_CreateProcessResponse {
  processId: string;
}

/**
 * pm_CreateProcess action
 *
 * Unbound action
 */
export class pm_CreateProcessAction implements Executable<pm_CreateProcessResponse> {
  constructor(
    public readonly reportData: string,
    public readonly inputDataBinding: string,
    public readonly name: string,
    public readonly description: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/pm_CreateProcess`;

    const body: Record<string, unknown> = {
      reportData: this.reportData,
      inputDataBinding: this.inputDataBinding,
      name: this.name,
      description: this.description,
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

  async parseResponse(response: Response): Promise<pm_CreateProcessResponse> {
    const data = await response.json();
    return data as pm_CreateProcessResponse;
  }
}
