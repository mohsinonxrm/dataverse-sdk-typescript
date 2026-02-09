import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from SaveAsDesktopFlow action
 */
export interface SaveAsDesktopFlowResponse {
  workflowId: string;
}

/**
 * SaveAsDesktopFlow action
 *
 * Bound action
 * Binding parameter: entity (mscrm.workflow)
 */
export class SaveAsDesktopFlowAction implements Executable<SaveAsDesktopFlowResponse> {
  constructor(
    public readonly workflowId: string,
    public readonly desktopFlowName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.SaveAsDesktopFlow`;

    const body: Record<string, unknown> = {
      desktopFlowName: this.desktopFlowName,
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

  async parseResponse(response: Response): Promise<SaveAsDesktopFlowResponse> {
    const data = await response.json();
    return data as SaveAsDesktopFlowResponse;
  }
}
