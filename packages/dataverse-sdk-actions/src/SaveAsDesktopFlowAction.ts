import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from SaveAsDesktopFlow action
 */
export interface SaveAsDesktopFlowResponse {
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
    const url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.SaveAsDesktopFlow`;

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as SaveAsDesktopFlowResponse;
    return (await response.json()) as SaveAsDesktopFlowResponse;
  }
}
