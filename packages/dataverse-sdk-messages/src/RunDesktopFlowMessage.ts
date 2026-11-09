import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    const url = `${baseUrl}/workflows(${odataLiteral.guid(this.workflowId)})/Microsoft.Dynamics.CRM.RunDesktopFlow`;

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
    // The body is the complex value, with its @odata.context
    return RunDesktopFlowResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RunDesktopFlow action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RunDesktopFlowResult {
  "@odata.context"?: string;
  flowsessionId: string;
}

/**
 * RunDesktopFlow response message
 *
 * `result` is the value the RunDesktopFlow action returns (see {@link RunDesktopFlowResult}).
 */
export class RunDesktopFlowResponse extends OrganizationResponse {
  constructor(public result: RunDesktopFlowResult) {
    super("RunDesktopFlow");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RunDesktopFlowResponse {
    return new RunDesktopFlowResponse(data as RunDesktopFlowResult);
  }
}
