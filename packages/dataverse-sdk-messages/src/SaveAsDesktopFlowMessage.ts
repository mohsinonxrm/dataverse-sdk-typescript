import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { SaveAsDesktopFlowResponse as SaveAsDesktopFlowResponseData } from "./types/index.js";

/**
 * SaveAsDesktopFlow request message
 *
 * Web API Action: SaveAsDesktopFlow
 */
export class SaveAsDesktopFlowRequest
  extends OrganizationRequest
  implements Executable<SaveAsDesktopFlowResponse>
{
  constructor(
    public workflowId: string,
    public desktopFlowName: string
  ) {
    super("SaveAsDesktopFlow");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<SaveAsDesktopFlowResponse> {
    const data = await response.json();
    return SaveAsDesktopFlowResponse.fromResponse(data);
  }
}

/**
 * SaveAsDesktopFlow response message
 */
export class SaveAsDesktopFlowResponse extends OrganizationResponse {
  constructor(public result: SaveAsDesktopFlowResponseData) {
    super("SaveAsDesktopFlow");
  }

  static fromResponse(data: unknown): SaveAsDesktopFlowResponse {
    return new SaveAsDesktopFlowResponse(responseObject<SaveAsDesktopFlowResponseData>(data));
  }
}
