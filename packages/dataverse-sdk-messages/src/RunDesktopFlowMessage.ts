import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { RunDesktopFlowResponse as RunDesktopFlowResponseData } from "./types/index.js";

/**
 * Parameters of the RunDesktopFlow message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RunDesktopFlowRequestParameters {
  connectionType?: number;
  connectionName: string;
  runMode: string;
  timeout?: number;
  callbackUrl?: string;
  runPriority?: string;
  inputs?: string;
}

/**
 * RunDesktopFlow request message
 *
 * Web API Action: RunDesktopFlow
 *
 * The first argument is the id of the workflow record to call it on.
 */
export class RunDesktopFlowRequest
  extends OrganizationRequest
  implements Executable<RunDesktopFlowResponse>
{
  declare readonly Parameters: Readonly<RunDesktopFlowRequestParameters>;

  constructor(
    public workflowId: string,
    parameters: RunDesktopFlowRequestParameters
  ) {
    super("RunDesktopFlow", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.RunDesktopFlow`;

    const body = requestBody({
      connectionType: this.Parameters.connectionType,
      connectionName: this.Parameters.connectionName,
      runMode: this.Parameters.runMode,
      timeout: this.Parameters.timeout,
      callbackUrl: this.Parameters.callbackUrl,
      runPriority: this.Parameters.runPriority,
      inputs: this.Parameters.inputs,
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
    if (response.status === 204) return RunDesktopFlowResponse.fromResponse({});
    return RunDesktopFlowResponse.fromResponse(await response.json());
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
