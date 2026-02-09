import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from TriggerDesktopFlowRunCallback action
 */
export interface TriggerDesktopFlowRunCallbackResponse {
  callbackHttpResponseCode: number;
}

/**
 * TriggerDesktopFlowRunCallback action
 *
 * Bound action
 * Binding parameter: entity (mscrm.flowsession)
 */
export class TriggerDesktopFlowRunCallbackAction implements Executable<TriggerDesktopFlowRunCallbackResponse> {
  constructor(public readonly flowsessionId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/flowsessions(${this.flowsessionId})/Microsoft.Dynamics.CRM.TriggerDesktopFlowRunCallback`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<TriggerDesktopFlowRunCallbackResponse> {
    const data = await response.json();
    return data as TriggerDesktopFlowRunCallbackResponse;
  }
}
