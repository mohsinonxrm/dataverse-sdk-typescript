import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GDPROptoutLead message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GDPROptoutLeadRequestParameters {
  optout: boolean;
}

/**
 * msdyn_GDPROptoutLead request message
 *
 * Web API Action: msdyn_GDPROptoutLead
 *
 * The first argument is the id of the lead record to call it on.
 */
export class msdyn_GDPROptoutLeadRequest
  extends OrganizationRequest
  implements Executable<msdyn_GDPROptoutLeadResponse>
{
  declare readonly Parameters: Readonly<msdyn_GDPROptoutLeadRequestParameters>;

  constructor(
    public leadId: string,
    parameters: msdyn_GDPROptoutLeadRequestParameters
  ) {
    super("msdyn_GDPROptoutLead", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/leads(${this.leadId})/Microsoft.Dynamics.CRM.msdyn_GDPROptoutLead`;

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

  async parseResponse(response: Response): Promise<msdyn_GDPROptoutLeadResponse> {
    // No return value (204 No Content)
    return new msdyn_GDPROptoutLeadResponse();
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
