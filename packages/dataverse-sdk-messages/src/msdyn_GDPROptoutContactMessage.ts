import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GDPROptoutContact request message
 *
 * Web API Action: msdyn_GDPROptoutContact
 */
export class msdyn_GDPROptoutContactRequest
  extends OrganizationRequest
  implements Executable<msdyn_GDPROptoutContactResponse>
{
  constructor(
    public contactId: string,
    public optout: boolean
  ) {
    super("msdyn_GDPROptoutContact");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/contacts(${this.contactId})/Microsoft.Dynamics.CRM.msdyn_GDPROptoutContact`;

    const body: Record<string, unknown> = {
      optout: this.optout,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GDPROptoutContactResponse> {
    // No return value (204 No Content)
    return new msdyn_GDPROptoutContactResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.contactId,
      optout: this.optout,
    };
  }
}

/**
 * msdyn_GDPROptoutContact response message
 */
export class msdyn_GDPROptoutContactResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_GDPROptoutContact");
  }

  static fromResponse(_data: unknown): msdyn_GDPROptoutContactResponse {
    return new msdyn_GDPROptoutContactResponse();
  }
}
