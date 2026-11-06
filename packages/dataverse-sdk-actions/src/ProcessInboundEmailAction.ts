import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ProcessInboundEmail action
 */
export interface ProcessInboundEmailResponse {
  // No content returned
}

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
    const url = `${baseUrl}/emails(${this.emailId})/Microsoft.Dynamics.CRM.ProcessInboundEmail`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<ProcessInboundEmailResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ProcessInboundEmailResponse;
    return (await response.json()) as ProcessInboundEmailResponse;
  }
}
