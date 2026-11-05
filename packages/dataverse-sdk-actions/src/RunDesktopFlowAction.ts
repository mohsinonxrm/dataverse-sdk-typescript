import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RunDesktopFlow action
 */
export interface RunDesktopFlowResponse {
  flowsessionId: string;
}

/**
 * RunDesktopFlow action
 *
 * Bound action
 * Binding parameter: entity (mscrm.workflow)
 */
export class RunDesktopFlowAction implements Executable<RunDesktopFlowResponse> {
  constructor(
    public readonly workflowId: string,
    public readonly inputs: string,
    public readonly runMode: string,
    public readonly connectionName: string,
    public readonly runPriority: string,
    public readonly timeout: number,
    public readonly connectionType: number,
    public readonly callbackUrl: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.RunDesktopFlow`;

    const body: Record<string, unknown> = {
      inputs: this.inputs,
      runMode: this.runMode,
      connectionName: this.connectionName,
      runPriority: this.runPriority,
      timeout: this.timeout,
      connectionType: this.connectionType,
      callbackUrl: this.callbackUrl,
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

  async parseResponse(response: Response): Promise<RunDesktopFlowResponse> {
    const data = await response.json();
    return data as RunDesktopFlowResponse;
  }
}
