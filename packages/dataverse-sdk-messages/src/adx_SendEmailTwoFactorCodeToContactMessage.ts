import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the adx_SendEmailTwoFactorCodeToContact message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface adx_SendEmailTwoFactorCodeToContactRequestParameters {
  Code: string;
  BusinessProcessFlowId?: string;
  BusinessProcessFlowInstanceId?: string;
  ActionStepId?: string;
}

/**
 * adx_SendEmailTwoFactorCodeToContact request message
 *
 * Web API Action: adx_SendEmailTwoFactorCodeToContact
 *
 * The first argument is the id of the contact record to call it on.
 */
export class adx_SendEmailTwoFactorCodeToContactRequest
  extends OrganizationRequest
  implements Executable<adx_SendEmailTwoFactorCodeToContactResponse>
{
  declare readonly Parameters: Readonly<adx_SendEmailTwoFactorCodeToContactRequestParameters>;

  constructor(
    public contactId: string,
    parameters: adx_SendEmailTwoFactorCodeToContactRequestParameters
  ) {
    super("adx_SendEmailTwoFactorCodeToContact", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/contacts(${this.contactId})/Microsoft.Dynamics.CRM.adx_SendEmailTwoFactorCodeToContact`;

    const body = requestBody({
      Code: this.Parameters.Code,
      BusinessProcessFlowId: this.Parameters.BusinessProcessFlowId,
      BusinessProcessFlowInstanceId: this.Parameters.BusinessProcessFlowInstanceId,
      ActionStepId: this.Parameters.ActionStepId,
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

  async parseResponse(response: Response): Promise<adx_SendEmailTwoFactorCodeToContactResponse> {
    // No return value (204 No Content)
    return new adx_SendEmailTwoFactorCodeToContactResponse();
  }
}

/**
 * adx_SendEmailTwoFactorCodeToContact response message
 */
export class adx_SendEmailTwoFactorCodeToContactResponse extends OrganizationResponse {
  constructor() {
    super("adx_SendEmailTwoFactorCodeToContact");
  }

  static fromResponse(_data: unknown): adx_SendEmailTwoFactorCodeToContactResponse {
    return new adx_SendEmailTwoFactorCodeToContactResponse();
  }
}
