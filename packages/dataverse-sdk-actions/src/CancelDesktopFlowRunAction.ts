import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the CancelDesktopFlowRun action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type CancelDesktopFlowRunResponse = void;

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
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
