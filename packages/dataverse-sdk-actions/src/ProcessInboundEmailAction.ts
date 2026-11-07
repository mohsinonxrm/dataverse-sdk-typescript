import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the ProcessInboundEmail action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type ProcessInboundEmailResponse = void;

/**
 * ProcessInboundEmail action
 *
 * Bound action
 * Binding parameter: entity (mscrm.email)
 *
 * The first argument is the id of the email record to call it on.
 */
export class ProcessInboundEmailAction implements Executable<ProcessInboundEmailResponse> {
  constructor(public readonly emailId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/emails(${odataLiteral.guid(this.emailId)})/Microsoft.Dynamics.CRM.ProcessInboundEmail`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<ProcessInboundEmailResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
