import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the RunDesktopFlow action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RunDesktopFlowResponse {
  "@odata.context"?: string;
  flowsessionId: string;
}

/**
 * Parameters of the RunDesktopFlow action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RunDesktopFlowActionParameters {
  connectionType?: number;
  connectionName: string;
  runMode: string;
  timeout?: number;
  callbackUrl?: string;
  runPriority?: string;
  inputs?: string;
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
    const url = `${baseUrl}/workflows(${odataLiteral.guid(this.workflowId)})/Microsoft.Dynamics.CRM.RunDesktopFlow`;

    const body = requestBody({
      connectionType: this.parameters.connectionType,
      connectionName: this.parameters.connectionName,
      runMode: this.parameters.runMode,
      timeout: this.parameters.timeout,
      callbackUrl: this.parameters.callbackUrl,
      runPriority: this.parameters.runPriority,
      inputs: this.parameters.inputs,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RunDesktopFlowResponse;
  }
}
