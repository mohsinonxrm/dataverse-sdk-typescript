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
 *
 * The first argument is the id of the flowsession record to call it on.
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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<TriggerDesktopFlowRunCallbackResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as TriggerDesktopFlowRunCallbackResponse;
  }
}
