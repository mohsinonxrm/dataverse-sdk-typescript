import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    const url = `${baseUrl}/workflows(${odataLiteral.guid(this.workflowId)})/Microsoft.Dynamics.CRM.SaveAsDesktopFlow`;

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
    // The body is the complex value, with its @odata.context
    return SaveAsDesktopFlowResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the SaveAsDesktopFlow action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface SaveAsDesktopFlowResult {
  "@odata.context"?: string;
  workflowId: string;
}

/**
 * SaveAsDesktopFlow response message
 *
 * `result` is the value the SaveAsDesktopFlow action returns (see {@link SaveAsDesktopFlowResult}).
 */
export class SaveAsDesktopFlowResponse extends OrganizationResponse {
  constructor(public result: SaveAsDesktopFlowResult) {
    super("SaveAsDesktopFlow");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): SaveAsDesktopFlowResponse {
    return new SaveAsDesktopFlowResponse(data as SaveAsDesktopFlowResult);
  }
}
