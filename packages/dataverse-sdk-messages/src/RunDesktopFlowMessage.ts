import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * RunDesktopFlow request message
 *
 * Web API Action: RunDesktopFlow
 */
export class RunDesktopFlowRequest
  extends OrganizationRequest
  implements Executable<RunDesktopFlowResponse>
{
  constructor(
    public workflowId: string,
    public inputs: string,
    public runMode: string,
    public connectionName: string,
    public runPriority: string,
    public timeout: number,
    public connectionType: number,
    public callbackUrl: string
  ) {
    super("RunDesktopFlow");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.RunDesktopFlow`;

    const body: Record<string, unknown> = {
      inputs: this.inputs,
      runMode: this.runMode,
      connectionName: this.connectionName,
      runPriority: this.runPriority,
      timeout: this.timeout,
      connectionType: this.connectionType,
      callbackUrl: this.callbackUrl,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<RunDesktopFlowResponse> {
    const data = await response.json();
    return RunDesktopFlowResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.workflowId,
      inputs: this.inputs,
      runMode: this.runMode,
      connectionName: this.connectionName,
      runPriority: this.runPriority,
      timeout: this.timeout,
      connectionType: this.connectionType,
      callbackUrl: this.callbackUrl,
    };
  }
}

/**
 * RunDesktopFlow response message
 */
export class RunDesktopFlowResponse extends OrganizationResponse {
  constructor(public result: RunDesktopFlowResponse) {
    super("RunDesktopFlow");
  }

  static fromResponse(data: unknown): RunDesktopFlowResponse {
    return new RunDesktopFlowResponse((data as any).value);
  }
}
