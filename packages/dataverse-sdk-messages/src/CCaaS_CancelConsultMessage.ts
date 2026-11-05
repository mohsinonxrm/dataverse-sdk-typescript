import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_CancelConsult request message
 *
 * Web API Action: CCaaS_CancelConsult
 */
export class CCaaS_CancelConsultRequest
  extends OrganizationRequest
  implements Executable<CCaaS_CancelConsultResponse>
{
  constructor(
    public msdyn_ocliveworkitemId: string,
    public apiVersion: string,
    public sessionId: string
  ) {
    super("CCaaS_CancelConsult");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_CancelConsult`;

    const body: Record<string, unknown> = {
      ApiVersion: this.apiVersion,
      SessionId: this.sessionId,
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

  async parseResponse(response: Response): Promise<CCaaS_CancelConsultResponse> {
    // No return value (204 No Content)
    return new CCaaS_CancelConsultResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_ocliveworkitemId,
      ApiVersion: this.apiVersion,
      SessionId: this.sessionId,
    };
  }
}

/**
 * CCaaS_CancelConsult response message
 */
export class CCaaS_CancelConsultResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_CancelConsult");
  }

  static fromResponse(_data: unknown): CCaaS_CancelConsultResponse {
    return new CCaaS_CancelConsultResponse();
  }
}
