import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CancelDesktopFlowRun action
 */
export interface CancelDesktopFlowRunResponse {
  // No content returned
}

/**
 * CancelDesktopFlowRun action
 *
 * Bound action
 * Binding parameter: entity (mscrm.flowsession)
 *
 * The first argument is the id of the flowsession record to call it on.
 */
export class CancelDesktopFlowRunAction implements Executable<CancelDesktopFlowRunResponse> {
  constructor(public readonly flowsessionId: string) {}

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CancelDesktopFlowRunResponse;
    return (await response.json()) as CancelDesktopFlowRunResponse;
  }
}
