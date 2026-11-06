import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the adx_SendPasswordResetToContact message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface adx_SendPasswordResetToContactRequestParameters {
  CallbackUrl: string;
  Code: string;
  UrlCode: string;
  Email: string;
  UserId: string;
  BusinessProcessFlowId?: string;
  BusinessProcessFlowInstanceId?: string;
  ActionStepId?: string;
}

/**
 * adx_SendPasswordResetToContact request message
 *
 * Web API Action: adx_SendPasswordResetToContact
 *
 * The first argument is the id of the contact record to call it on.
 */
export class adx_SendPasswordResetToContactRequest
  extends OrganizationRequest
  implements Executable<adx_SendPasswordResetToContactResponse>
{
  declare readonly Parameters: Readonly<adx_SendPasswordResetToContactRequestParameters>;

  constructor(
    public contactId: string,
    parameters: adx_SendPasswordResetToContactRequestParameters
  ) {
    super("adx_SendPasswordResetToContact", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/contacts(${this.contactId})/Microsoft.Dynamics.CRM.adx_SendPasswordResetToContact`;

    const body = requestBody({
      CallbackUrl: this.Parameters.CallbackUrl,
      Code: this.Parameters.Code,
      UrlCode: this.Parameters.UrlCode,
      Email: this.Parameters.Email,
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

  async parseResponse(response: Response): Promise<adx_SendPasswordResetToContactResponse> {
    // No return value (204 No Content)
    return new adx_SendPasswordResetToContactResponse();
  }
}

/**
 * adx_SendPasswordResetToContact response message
 */
export class adx_SendPasswordResetToContactResponse extends OrganizationResponse {
  constructor() {
    super("adx_SendPasswordResetToContact");
  }

  static fromResponse(_data: unknown): adx_SendPasswordResetToContactResponse {
    return new adx_SendPasswordResetToContactResponse();
  }
}
