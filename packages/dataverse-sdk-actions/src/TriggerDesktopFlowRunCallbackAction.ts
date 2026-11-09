import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the TriggerDesktopFlowRunCallback action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface TriggerDesktopFlowRunCallbackResponse {
  "@odata.context"?: string;
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
    const url = `${baseUrl}/flowsessions(${odataLiteral.guid(this.flowsessionId)})/Microsoft.Dynamics.CRM.TriggerDesktopFlowRunCallback`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<TriggerDesktopFlowRunCallbackResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as TriggerDesktopFlowRunCallbackResponse;
  }
}
