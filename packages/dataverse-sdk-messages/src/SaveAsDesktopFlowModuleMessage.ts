import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { SaveAsDesktopFlowModuleResponse as SaveAsDesktopFlowModuleResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return SaveAsDesktopFlowModuleResponse.fromResponse({});
    return SaveAsDesktopFlowModuleResponse.fromResponse(await response.json());
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
