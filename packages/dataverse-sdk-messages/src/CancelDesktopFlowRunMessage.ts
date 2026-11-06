import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CancelDesktopFlowRun request message
 *
 * Web API Action: CancelDesktopFlowRun
 */
export class CancelDesktopFlowRunRequest
  extends OrganizationRequest
  implements Executable<CancelDesktopFlowRunResponse>
{
  constructor(public flowsessionId: string) {
    super("CancelDesktopFlowRun");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/flowsessions(${this.flowsessionId})/Microsoft.Dynamics.CRM.CancelDesktopFlowRun`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<CancelDesktopFlowRunResponse> {
    // No return value (204 No Content)
    return new CancelDesktopFlowRunResponse();
  }
}

/**
 * CancelDesktopFlowRun response message
 */
export class CancelDesktopFlowRunResponse extends OrganizationResponse {
  constructor() {
    super("CancelDesktopFlowRun");
  }

  static fromResponse(_data: unknown): CancelDesktopFlowRunResponse {
    return new CancelDesktopFlowRunResponse();
  }
}
