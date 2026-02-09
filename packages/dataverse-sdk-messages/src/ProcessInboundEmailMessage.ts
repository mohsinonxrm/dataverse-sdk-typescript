import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * ProcessInboundEmail request message
 *
 * Web API Action: ProcessInboundEmail
 */
export class ProcessInboundEmailRequest
  extends OrganizationRequest
  implements Executable<ProcessInboundEmailResponse>
{
  constructor(public emailId: string) {
    super("ProcessInboundEmail");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/emails(${this.emailId})/Microsoft.Dynamics.CRM.ProcessInboundEmail`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<ProcessInboundEmailResponse> {
    // No return value (204 No Content)
    return new ProcessInboundEmailResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.emailId,
    };
  }
}

/**
 * ProcessInboundEmail response message
 */
export class ProcessInboundEmailResponse extends OrganizationResponse {
  constructor() {
    super("ProcessInboundEmail");
  }

  static fromResponse(_data: unknown): ProcessInboundEmailResponse {
    return new ProcessInboundEmailResponse();
  }
}
