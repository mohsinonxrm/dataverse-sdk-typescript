import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { SaveAsDesktopFlowModuleResponse as SaveAsDesktopFlowModuleResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<SaveAsDesktopFlowModuleResponse> {
    const data = await response.json();
    return SaveAsDesktopFlowModuleResponse.fromResponse(data);
  }
}

/**
 * SaveAsDesktopFlowModule response message
 */
export class SaveAsDesktopFlowModuleResponse extends OrganizationResponse {
  constructor(public result: SaveAsDesktopFlowModuleResponseData) {
    super("SaveAsDesktopFlowModule");
  }

  static fromResponse(data: unknown): SaveAsDesktopFlowModuleResponse {
    return new SaveAsDesktopFlowModuleResponse(
      responseObject<SaveAsDesktopFlowModuleResponseData>(data)
    );
  }
}
