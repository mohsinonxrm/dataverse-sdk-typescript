import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GDPROptoutContact message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GDPROptoutContactRequestParameters {
  optout: boolean;
}

/**
 * msdyn_GDPROptoutContact request message
 *
 * Web API Action: msdyn_GDPROptoutContact
 *
 * The first argument is the id of the contact record to call it on.
 */
export class msdyn_GDPROptoutContactRequest
  extends OrganizationRequest
  implements Executable<msdyn_GDPROptoutContactResponse>
{
  declare readonly Parameters: Readonly<msdyn_GDPROptoutContactRequestParameters>;

  constructor(
    public contactId: string,
    parameters: msdyn_GDPROptoutContactRequestParameters
  ) {
    super("msdyn_GDPROptoutContact", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/contacts(${odataLiteral.guid(this.contactId)})/Microsoft.Dynamics.CRM.msdyn_GDPROptoutContact`;

    const body = requestBody({
      optout: this.Parameters.optout,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  parseResponse(_response: Response): Promise<msdyn_GDPROptoutContactResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_GDPROptoutContactResponse());
  }
}

/**
 * msdyn_GDPROptoutContact response message
 */
export class msdyn_GDPROptoutContactResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_GDPROptoutContact");
  }

  static fromResponse(_data?: unknown): msdyn_GDPROptoutContactResponse {
    return new msdyn_GDPROptoutContactResponse();
  }
}
