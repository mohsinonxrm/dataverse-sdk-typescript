import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * ProcessInboundEmail request message
 *
 * Web API Action: ProcessInboundEmail
 *
 * The first argument is the id of the email record to call it on.
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
    // No return value (204 No Content)
    return Promise.resolve(new ProcessInboundEmailResponse());
  }
}

/**
 * ProcessInboundEmail response message
 */
export class ProcessInboundEmailResponse extends OrganizationResponse {
  constructor() {
    super("ProcessInboundEmail");
  }

  static fromResponse(_data?: unknown): ProcessInboundEmailResponse {
    return new ProcessInboundEmailResponse();
  }
}
