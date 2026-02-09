import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GDPROptoutLead request message
 *
 * Web API Action: msdyn_GDPROptoutLead
 */
export class msdyn_GDPROptoutLeadRequest
  extends OrganizationRequest
  implements Executable<msdyn_GDPROptoutLeadResponse>
{
  constructor(
    public leadId: string,
    public optout: boolean
  ) {
    super("msdyn_GDPROptoutLead");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/leads(${this.leadId})/Microsoft.Dynamics.CRM.msdyn_GDPROptoutLead`;

    const body: Record<string, unknown> = {
      optout: this.optout,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GDPROptoutLeadResponse> {
    // No return value (204 No Content)
    return new msdyn_GDPROptoutLeadResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.leadId,
      optout: this.optout,
    };
  }
}

/**
 * msdyn_GDPROptoutLead response message
 */
export class msdyn_GDPROptoutLeadResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_GDPROptoutLead");
  }

  static fromResponse(_data: unknown): msdyn_GDPROptoutLeadResponse {
    return new msdyn_GDPROptoutLeadResponse();
  }
}
