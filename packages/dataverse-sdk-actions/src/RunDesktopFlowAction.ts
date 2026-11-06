import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from RunDesktopFlow action
 */
export interface RunDesktopFlowResponse {
  flowsessionId: string;
}

/**
 * Parameters of the RunDesktopFlow action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RunDesktopFlowActionParameters {
  inputs?: string;
  runMode: string;
  connectionName: string;
  runPriority?: string;
  timeout?: number;
  connectionType?: number;
  callbackUrl?: string;
}

/**
 * RunDesktopFlow action
 *
 * Bound action
 * Binding parameter: entity (mscrm.workflow)
 *
 * The first argument is the id of the workflow record to call it on.
 */
export class RunDesktopFlowAction implements Executable<RunDesktopFlowResponse> {
  constructor(
    public readonly workflowId: string,
    public readonly parameters: RunDesktopFlowActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.RunDesktopFlow`;

    const body = requestBody({
      inputs: this.parameters.inputs,
      runMode: this.parameters.runMode,
      connectionName: this.parameters.connectionName,
      runPriority: this.parameters.runPriority,
      timeout: this.parameters.timeout,
      connectionType: this.parameters.connectionType,
      callbackUrl: this.parameters.callbackUrl,
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

  async parseResponse(response: Response): Promise<RunDesktopFlowResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RunDesktopFlowResponse;
    return (await response.json()) as RunDesktopFlowResponse;
  }
}
