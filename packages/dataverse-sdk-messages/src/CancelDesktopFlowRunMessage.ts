import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CancelDesktopFlowRun request message
 *
 * Web API Action: CancelDesktopFlowRun
 *
 * The first argument is the id of the flowsession record to call it on.
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
    const url = `${baseUrl}/flowsessions(${odataLiteral.guid(this.flowsessionId)})/Microsoft.Dynamics.CRM.CancelDesktopFlowRun`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<CancelDesktopFlowRunResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new CancelDesktopFlowRunResponse());
  }
}

/**
 * CancelDesktopFlowRun response message
 */
export class CancelDesktopFlowRunResponse extends OrganizationResponse {
  constructor() {
    super("CancelDesktopFlowRun");
  }

  static fromResponse(_data?: unknown): CancelDesktopFlowRunResponse {
    return new CancelDesktopFlowRunResponse();
  }
}
