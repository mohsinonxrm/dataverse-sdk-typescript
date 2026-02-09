import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * SaveAsDesktopFlowModule request message
 *
 * Web API Action: SaveAsDesktopFlowModule
 */
export class SaveAsDesktopFlowModuleRequest
  extends OrganizationRequest
  implements Executable<SaveAsDesktopFlowModuleResponse>
{
  constructor(
    public desktopflowmoduleId: string,
    public desktopFlowModuleName: string
  ) {
    super("SaveAsDesktopFlowModule");
  }

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
    return SaveAsDesktopFlowModuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.desktopflowmoduleId,
      desktopFlowModuleName: this.desktopFlowModuleName,
    };
  }
}

/**
 * SaveAsDesktopFlowModule response message
 */
export class SaveAsDesktopFlowModuleResponse extends OrganizationResponse {
  constructor(public result: SaveAsDesktopFlowModuleResponse) {
    super("SaveAsDesktopFlowModule");
  }

  static fromResponse(data: unknown): SaveAsDesktopFlowModuleResponse {
    return new SaveAsDesktopFlowModuleResponse((data as any).value);
  }
}
