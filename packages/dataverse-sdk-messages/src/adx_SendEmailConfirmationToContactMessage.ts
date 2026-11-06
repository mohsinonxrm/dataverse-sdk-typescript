import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the adx_SendEmailConfirmationToContact message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface adx_SendEmailConfirmationToContactRequestParameters {
  CallbackUrl: string;
  Code: string;
  UrlCode: string;
  UserId: string;
  BusinessProcessFlowId?: string;
  BusinessProcessFlowInstanceId?: string;
  ActionStepId?: string;
}

/**
 * adx_SendEmailConfirmationToContact request message
 *
 * Web API Action: adx_SendEmailConfirmationToContact
 *
 * The first argument is the id of the contact record to call it on.
 */
export class adx_SendEmailConfirmationToContactRequest
  extends OrganizationRequest
  implements Executable<adx_SendEmailConfirmationToContactResponse>
{
  declare readonly Parameters: Readonly<adx_SendEmailConfirmationToContactRequestParameters>;

  constructor(
    public contactId: string,
    parameters: adx_SendEmailConfirmationToContactRequestParameters
  ) {
    super("adx_SendEmailConfirmationToContact", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/contacts(${this.contactId})/Microsoft.Dynamics.CRM.adx_SendEmailConfirmationToContact`;

    const body = requestBody({
      CallbackUrl: this.Parameters.CallbackUrl,
      Code: this.Parameters.Code,
      UrlCode: this.Parameters.UrlCode,
      UserId: this.Parameters.UserId,
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

  parseResponse(_response: Response): Promise<adx_SendEmailConfirmationToContactResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new adx_SendEmailConfirmationToContactResponse());
  }
}

/**
 * adx_SendEmailConfirmationToContact response message
 */
export class adx_SendEmailConfirmationToContactResponse extends OrganizationResponse {
  constructor() {
    super("adx_SendEmailConfirmationToContact");
  }

  static fromResponse(_data?: unknown): adx_SendEmailConfirmationToContactResponse {
    return new adx_SendEmailConfirmationToContactResponse();
  }
}
