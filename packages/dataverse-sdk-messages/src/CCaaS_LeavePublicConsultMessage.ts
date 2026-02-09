import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_LeavePublicConsult request message
 *
 * Web API Action: CCaaS_LeavePublicConsult
 */
export class CCaaS_LeavePublicConsultRequest
  extends OrganizationRequest
  implements Executable<CCaaS_LeavePublicConsultResponse>
{
  constructor(
    public msdyn_ocliveworkitemId: string,
    public apiVersion: string
  ) {
    super("CCaaS_LeavePublicConsult");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_LeavePublicConsult`;

    const body: Record<string, unknown> = {
      ApiVersion: this.apiVersion,
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

  async parseResponse(response: Response): Promise<CCaaS_LeavePublicConsultResponse> {
    // No return value (204 No Content)
    return new CCaaS_LeavePublicConsultResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_ocliveworkitemId,
      ApiVersion: this.apiVersion,
    };
  }
}

/**
 * CCaaS_LeavePublicConsult response message
 */
export class CCaaS_LeavePublicConsultResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_LeavePublicConsult");
  }

  static fromResponse(_data: unknown): CCaaS_LeavePublicConsultResponse {
    return new CCaaS_LeavePublicConsultResponse();
  }
}
