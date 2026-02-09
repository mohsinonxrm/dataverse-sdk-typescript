import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from SaveAsDesktopFlowModule action
 */
export interface SaveAsDesktopFlowModuleResponse {
  desktopflowmoduleid: string;
}

/**
 * SaveAsDesktopFlowModule action
 *
 * Bound action
 * Binding parameter: entity (mscrm.desktopflowmodule)
 */
export class SaveAsDesktopFlowModuleAction implements Executable<SaveAsDesktopFlowModuleResponse> {
  constructor(
    public readonly desktopflowmoduleId: string,
    public readonly desktopFlowModuleName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/desktopflowmodules(${this.desktopflowmoduleId})/Microsoft.Dynamics.CRM.SaveAsDesktopFlowModule`;

    const body: Record<string, unknown> = {
      desktopFlowModuleName: this.desktopFlowModuleName,
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

  async parseResponse(response: Response): Promise<SaveAsDesktopFlowModuleResponse> {
    const data = await response.json();
    return data as SaveAsDesktopFlowModuleResponse;
  }
}
