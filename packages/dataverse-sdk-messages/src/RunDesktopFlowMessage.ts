import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { RunDesktopFlowResponse as RunDesktopFlowResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<RunDesktopFlowResponse> {
    const data = await response.json();
    return RunDesktopFlowResponse.fromResponse(data);
  }
}

/**
 * RunDesktopFlow response message
 */
export class RunDesktopFlowResponse extends OrganizationResponse {
  constructor(public result: RunDesktopFlowResponseData) {
    super("RunDesktopFlow");
  }

  static fromResponse(data: unknown): RunDesktopFlowResponse {
    return new RunDesktopFlowResponse(responseObject<RunDesktopFlowResponseData>(data));
  }
}
