import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_InitiateOutboundCall message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_InitiateOutboundCallRequestParameters {
  IsUserPhoneNumber: boolean;
  ParticipantType: string;
  CallerName: string;
  ApiVersion: string;
  ParticipantId: string;
  CallFrom: string;
}

/**
 * CCaaS_InitiateOutboundCall request message
 *
 * Web API Action: CCaaS_InitiateOutboundCall
 */
export class CCaaS_InitiateOutboundCallRequest
  extends OrganizationRequest
  implements Executable<CCaaS_InitiateOutboundCallResponse>
{
  declare readonly Parameters: Readonly<CCaaS_InitiateOutboundCallRequestParameters>;

  constructor(parameters: CCaaS_InitiateOutboundCallRequestParameters) {
    super("CCaaS_InitiateOutboundCall", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_InitiateOutboundCall`;

    const body = requestBody({
      IsUserPhoneNumber: this.Parameters.IsUserPhoneNumber,
      ParticipantType: this.Parameters.ParticipantType,
      CallerName: this.Parameters.CallerName,
      ApiVersion: this.Parameters.ApiVersion,
      ParticipantId: this.Parameters.ParticipantId,
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

  async parseResponse(response: Response): Promise<CCaaS_InitiateOutboundCallResponse> {
    // No return value (204 No Content)
    return new CCaaS_InitiateOutboundCallResponse();
  }
}

/**
 * CCaaS_InitiateOutboundCall response message
 */
export class CCaaS_InitiateOutboundCallResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_InitiateOutboundCall");
  }

  static fromResponse(_data: unknown): CCaaS_InitiateOutboundCallResponse {
    return new CCaaS_InitiateOutboundCallResponse();
  }
}
