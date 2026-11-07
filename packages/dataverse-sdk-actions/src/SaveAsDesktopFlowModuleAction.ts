import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the SaveAsDesktopFlowModule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface SaveAsDesktopFlowModuleResponse {
  "@odata.context"?: string;
  desktopflowmoduleid: string;
}

/**
 * Parameters of the SaveAsDesktopFlowModule action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SaveAsDesktopFlowModuleActionParameters {
  desktopFlowModuleName: string;
}

/**
 * SaveAsDesktopFlowModule action
 *
 * Bound action
 * Binding parameter: entity (mscrm.desktopflowmodule)
 *
 * The first argument is the id of the desktopflowmodule record to call it on.
 */
export class SaveAsDesktopFlowModuleAction implements Executable<SaveAsDesktopFlowModuleResponse> {
  constructor(
    public readonly desktopflowmoduleId: string,
    public readonly parameters: SaveAsDesktopFlowModuleActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/desktopflowmodules(${odataLiteral.guid(this.desktopflowmoduleId)})/Microsoft.Dynamics.CRM.SaveAsDesktopFlowModule`;

    const body = requestBody({
      desktopFlowModuleName: this.parameters.desktopFlowModuleName,
    });

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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as SaveAsDesktopFlowModuleResponse;
  }
}
