import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the SaveAsDesktopFlow action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface SaveAsDesktopFlowResponse {
  "@odata.context"?: string;
  workflowId: string;
}

/**
 * Parameters of the SaveAsDesktopFlow action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SaveAsDesktopFlowActionParameters {
  desktopFlowName: string;
}

/**
 * SaveAsDesktopFlow action
 *
 * Bound action
 * Binding parameter: entity (mscrm.workflow)
 *
 * The first argument is the id of the workflow record to call it on.
 */
export class SaveAsDesktopFlowAction implements Executable<SaveAsDesktopFlowResponse> {
  constructor(
    public readonly workflowId: string,
    public readonly parameters: SaveAsDesktopFlowActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${odataLiteral.guid(this.workflowId)})/Microsoft.Dynamics.CRM.SaveAsDesktopFlow`;

    const body = requestBody({
      desktopFlowName: this.parameters.desktopFlowName,
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
    return (await response.json()) as SaveAsDesktopFlowResponse;
  }
}
