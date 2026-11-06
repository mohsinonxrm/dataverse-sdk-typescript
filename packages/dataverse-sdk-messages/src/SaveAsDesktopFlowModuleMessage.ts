import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the SaveAsDesktopFlowModule message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SaveAsDesktopFlowModuleRequestParameters {
  desktopFlowModuleName: string;
}

/**
 * SaveAsDesktopFlowModule request message
 *
 * Web API Action: SaveAsDesktopFlowModule
 *
 * The first argument is the id of the desktopflowmodule record to call it on.
 */
export class SaveAsDesktopFlowModuleRequest
  extends OrganizationRequest
  implements Executable<SaveAsDesktopFlowModuleResponse>
{
  declare readonly Parameters: Readonly<SaveAsDesktopFlowModuleRequestParameters>;

  constructor(
    public desktopflowmoduleId: string,
    parameters: SaveAsDesktopFlowModuleRequestParameters
  ) {
    super("SaveAsDesktopFlowModule", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/desktopflowmodules(${this.desktopflowmoduleId})/Microsoft.Dynamics.CRM.SaveAsDesktopFlowModule`;

    const body = requestBody({
      desktopFlowModuleName: this.Parameters.desktopFlowModuleName,
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
    return SaveAsDesktopFlowModuleResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the SaveAsDesktopFlowModule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface SaveAsDesktopFlowModuleResult {
  "@odata.context"?: string;
  desktopflowmoduleid: string;
}

/**
 * SaveAsDesktopFlowModule response message
 *
 * `result` is the value the SaveAsDesktopFlowModule action returns (see {@link SaveAsDesktopFlowModuleResult}).
 */
export class SaveAsDesktopFlowModuleResponse extends OrganizationResponse {
  constructor(public result: SaveAsDesktopFlowModuleResult) {
    super("SaveAsDesktopFlowModule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): SaveAsDesktopFlowModuleResponse {
    return new SaveAsDesktopFlowModuleResponse(data as SaveAsDesktopFlowModuleResult);
  }
}
