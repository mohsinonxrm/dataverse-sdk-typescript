import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_StartCall message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_StartCallRequestParameters {
  ClientId?: string;
  ParticipantId: string;
  CallerName: string;
  IsUserPhoneNumber: boolean;
  ApiVersion: string;
  ParticipantType: string;
  CallFrom: string;
}

/**
 * CCaaS_StartCall request message
 *
 * Web API Action: CCaaS_StartCall
 */
export class CCaaS_StartCallRequest
  extends OrganizationRequest
  implements Executable<CCaaS_StartCallResponse>
{
  declare readonly Parameters: Readonly<CCaaS_StartCallRequestParameters>;

  constructor(parameters: CCaaS_StartCallRequestParameters) {
    super("CCaaS_StartCall", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_StartCall`;

    const body = requestBody({
      ClientId: this.Parameters.ClientId,
      ParticipantId: this.Parameters.ParticipantId,
      CallerName: this.Parameters.CallerName,
      IsUserPhoneNumber: this.Parameters.IsUserPhoneNumber,
      ApiVersion: this.Parameters.ApiVersion,
      ParticipantType: this.Parameters.ParticipantType,
      CallFrom: this.Parameters.CallFrom,
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

  async parseResponse(response: Response): Promise<CCaaS_StartCallResponse> {
    // No return value (204 No Content)
    return new CCaaS_StartCallResponse();
  }
}

/**
 * CCaaS_StartCall response message
 */
export class CCaaS_StartCallResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_StartCall");
  }

  static fromResponse(_data: unknown): CCaaS_StartCallResponse {
    return new CCaaS_StartCallResponse();
  }
}
