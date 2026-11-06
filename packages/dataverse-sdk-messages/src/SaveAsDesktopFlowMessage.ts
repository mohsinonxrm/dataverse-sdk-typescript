import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { SaveAsDesktopFlowResponse as SaveAsDesktopFlowResponseData } from "./types/index.js";

/**
 * Parameters of the SaveAsDesktopFlow message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SaveAsDesktopFlowRequestParameters {
  desktopFlowName: string;
}

/**
 * SaveAsDesktopFlow request message
 *
 * Web API Action: SaveAsDesktopFlow
 *
 * The first argument is the id of the workflow record to call it on.
 */
export class SaveAsDesktopFlowRequest
  extends OrganizationRequest
  implements Executable<SaveAsDesktopFlowResponse>
{
  declare readonly Parameters: Readonly<SaveAsDesktopFlowRequestParameters>;

  constructor(
    public workflowId: string,
    parameters: SaveAsDesktopFlowRequestParameters
  ) {
    super("SaveAsDesktopFlow", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.SaveAsDesktopFlow`;

    const body = requestBody({
      desktopFlowName: this.Parameters.desktopFlowName,
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

  async parseResponse(response: Response): Promise<SaveAsDesktopFlowResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return SaveAsDesktopFlowResponse.fromResponse({});
    return SaveAsDesktopFlowResponse.fromResponse(await response.json());
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
